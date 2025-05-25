const express = require("express");
const app = express();
const path = require('path')
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const authRoutes = require('./Routes/Auth.js')
const userRoutes = require('./Routes/User.js')
const mongoose = require('mongoose');
const { MONGOURL } = require("./private.js");


const connectDB = async () => {
    try {
        await mongoose.connect(MONGOURL);
        console.log("connected to db");
    } catch (err) {
        console.log(err);
    }
}

mongoose.connection.on('connected', () => {
    console.log("DB connected");
})

mongoose.connection.on('disconnected', () => {
    console.log("DB disconnected");
})

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname + '/static/')));



app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.get('/', async (req, res) => {
    res.sendFile(path.resolve() + '/views/home.html');
})

app.listen(80, () => {
    connectDB();
    console.log("Server Started");
})