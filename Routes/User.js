const express = require("express");
const app = express();
const path = require('path');
const multer = require('multer');
const { verifyUser } = require("../middlewars/verifyUser");
const papers = require("../model/papers");
const info = require("../model/info");
let x = path.resolve() + '/views/';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './static/uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, 'project-' + uniqueSuffix + file.originalname)
    }
})
const upload = multer({ storage: storage })

app.get('/home', verifyUser, (req, res) => {
    res.sendFile(x + 'home.html');
})

app.get('/profile', verifyUser, (req, res) => {
    res.sendFile(x + 'profile.html')
})
app.get('/upload', verifyUser, (req, res) => {
    res.sendFile(x + 'upload.html')
})

app.post('/upload', verifyUser, upload.single('file'), async (req, res) => {
    let paper = new papers({
        file: `/uploads/${req.file.filename}`,
        name: req.body.name,
        desc: req.body.desc,
        email: req.user.email
    })
    paper = await paper.save();
    res.send("done");
})

app.get('/info', verifyUser, async (req, res) => {
    let data = await info.findOne({ email: req.user.email });
    res.json(data);
})

app.get('/about',(req,res)=>{
    res.sendFile(x + 'about.html');
})
app.get('/projects',(req,res)=>{
    res.sendFile(x + 'vimal.html');
})

module.exports = app;