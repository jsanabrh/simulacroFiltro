const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: Number,
    name: String,
    lastName: String,
    email: String,
    password: String,
    telephone: Number
});

const user = mongoose.model('user', userSchema);

module.exports = user;