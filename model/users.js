const mongoose = require('mongoose');

const users = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    }
}, { timestamps: true }
);

module.exports = mongoose.model('User', users);