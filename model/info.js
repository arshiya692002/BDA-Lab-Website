const mongoose = require('mongoose');

const info = new mongoose.Schema({
    bio: {
        type: String,
    },
    contact: {
        type: String,
    },
    add: {
        type: String,
    },
    email: {
        type: String,
    }
}, { timestamps: true }
);

module.exports = mongoose.model('Info', info);