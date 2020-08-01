const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const Places = require('../models/Places');

router.get('/places', auth, async (req, res) => {
    try{
        const places = await Places.find({userId: req.user});
        return res.status(200).json(places)
    }catch(err){
        return res.status(500).json({
            error:"Server Error"
        })
    }
})

router.post('/places', auth, async (req, res) => {
    try{
        const { location, date, timeSpent, rating } = req.body;
        const newPlace = new Places({
            location, 
            date, 
            timeSpent, 
            rating, 
            userId:req.user
        })
        const place = await newPlace.save();
        return res.status(200).json(place)
    }catch(err){
        return res.status(500).json({
            error:"Server Error"
        })
    }
})

router.delete('/places/:id', auth, async (req, res) => {
    try{
        const place = await Places.findOne({userId: req.user, _id: req.params.id});
        if(!place){
            return res.status(404).json({
                error:"No place found"
            })
        }
        const deletePlace = await Places.findByIdAndDelete(req.params.id);
        return res.status(200).json(deletePlace)
    }catch(err){
        return res.status(500).json({
            error:"Server Error"
        })
    }
})

router.patch('/places/:id', auth, async (req, res) => {
    try{
        const place = await Places.findOne({userId: req.user, _id: req.params.id});
        if(!place){
            return res.status(404).json({
                error:"No place found"
            })
        }
        if (req.body.location != null) {
        place.location = req.body.location;
        }
        if (req.body.date != null) {
        place.date = req.body.date;
        }
        if (req.body.timeSpent != null) {
        place.timeSpent = req.body.timeSpent;
        }
        if (req.body.rating != null) {
        place.rating = req.body.rating;
        }
        const updatePlace = await place.save();
        return res.status(201).json(updatePlace)
    }catch(err){
        return res.status(500).json({
            error:"Server Error"
        })
    }
})

module.exports = router;