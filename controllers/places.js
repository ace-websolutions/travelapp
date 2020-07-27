const Places = require('../models/Places');

exports.getPlaces = async (req, res, next) => {
    try{
        const places = await Places.find();
        return res.status(200).json({
            success: true,
            count: places.length,
            data: places
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            error:"Server Error"
        })
    }
}
exports.addPlace = async (req, res, next) => {
    try{
        const place = await Places.create(req.body);
        return res.status(200).json({
            success: true,
            data: place
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            error:"Server Error"
        })
    }
}
exports.deletePlace = async (req, res, next) => {
    try{
        const place = await Places.findById(req.params.id);
        if(!place){
            return res.status(404).json({
                success:false,
                error:"No place found"
            })
        }
        await place.remove();
        return res.status(200).json({
            success: true,
            data: {}
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            error:"Server Error"
        })
    }
}
exports.editPlace = async (req, res, next) => {
    try{
        const place = await Places.findById(req.params.id);
        if(!place){
            return res.status(404).json({
                success:false,
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
        return res.status(201).json({
            success: true,
            data: updatePlace
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            error:"Server Error"
        })
    }
}