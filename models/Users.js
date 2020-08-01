const mongoose = require('mongoose');

const UserScheme = new mongoose.Schema({
    email: { type: String, required: true, unique:true },
    password:{ type: String, required: true, minlength:8 },
    firstName:{ type: String, required: true }
});

module.exports = mongoose.model("User", UserScheme)