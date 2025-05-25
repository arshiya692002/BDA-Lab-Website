const mongoose = require('mongoose');

const papers = new mongoose.Schema({
    email: {
        type: String,
    },
    name: {
        type: String,
    },
    desc: {
        type: String,
    },
    file: {
        type: String,
    }
}, { timestamps: true }
);

module.exports = mongoose.model('Papers', papers);