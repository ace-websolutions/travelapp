const {Mongoose} = require('mongoose')

const mongoose = require('mongoose')

const PlacesScheme = new mongoose.Schema({
    location: { type: String, trim: true },
    date: { type: String, trim: true },
    timeSpent: { type: String, trim: true },
    rating:{ type: Number, trim:true },
    userId: { type: String, required:true }
})

module.exports = mongoose.model("Places", PlacesScheme)