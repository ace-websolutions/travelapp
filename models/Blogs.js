const {Mongoose} = require('mongoose')

const mongoose = require('mongoose')

const BlogsScheme = new mongoose.Schema({
    title: {type: String, trim: true},
    date: {type: String, trim: true},
    description: {type: String, trim: true},
    userId: {type: String, required: true}
})

module.exports = mongoose.model("Blog", BlogsScheme)