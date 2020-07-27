const {Mongoose} = require('mongoose')

const mongoose = require('mongoose')

const FoodsScheme = new mongoose.Schema({
    image: {
        type: String,
        trim: true
    },
    name: {
        type: String,
        trim: true
    },
    place: {
        type: String,
        trim: true
    },
})

module.exports = mongoose.model("Food", FoodsScheme)