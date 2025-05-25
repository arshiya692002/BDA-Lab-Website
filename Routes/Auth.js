const express = require("express");
const app = express();
const path = require('path')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { JWT } = require('../private.js');
const Users = require("../model/users.js");
let x = path.resolve() + '/views/';


app.get('/register', (req, res) => {
    res.sendFile(x + '/signup.html');
})

app.post('/register', async (req, res) => {
    let { password, ...otherdata } = req.body;
    let data = await Users.findOne({ email: req.body.email })
    console.log(data);
    if (data) {
        res.send({ "error": "User already exist", "data": req.body });
    }
    else {
        data = await Users.findOne({ username: req.body.username });
        if (data) {
            res.send({ "error": "User already exist", "data": req.body });
        }
        else {
            bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
                password = hash;
                let newUser = {
                    password, ...otherdata
                }
                console.log(newUser);
                newUser = new Users(newUser);
                newUser = await newUser.save();
                res.send({ "error": "", "data": {} });
            });
        }
    }
})

app.post('/verifyUsername', async (req, res) => {
    let data = await Users.findOne({ username: req.body.username });
    if (!data) res.send({ "success": true });
    else res.json({ "success": false });
})

app.get('/login', (req, res) => {
    res.sendFile(path.resolve() + '/views/login.html');
})

app.post('/login', async (req, res) => {
    let user = req.body;
    let data = await Users.findOne({ username: req.body.username });
    if (!data) {
        res.json({ "error": "Wrong Username or password", "data": null });
    }
    else {
        bcrypt.compare(req.body.password, data.password, function (err, result) {
            if (result) {
                data = data._doc;
                let { ...payload } = data;
                let token = jwt.sign(payload, JWT);
                res.cookie("access_token", token).json({ "error": null, "data": data });
            }
            else {
                res.json({ "error": "Wrong Username or password", "data": null });
            }
        });
    }
})


module.exports = app;