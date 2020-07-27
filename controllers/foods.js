const Foods = require('../models/Foods');

exports.getFoods = async (req, res, next) => {
    try{
        const foods = await Foods.find();
        return res.status(200).json({
            success: true,
            count: foods.length,
            data: foods
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            error:"Server Error"
        })
    }
}
exports.addFood = async (req, res, next) => {
    try{
        const food = await Foods.create(req.body);
        return res.status(200).json({
            success: true,
            data: food
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            error:"Server Error"
        })
    }
}
exports.deleteFood = async (req, res, next) => {
    try{
        const food = await Foods.findById(req.params.id);
        if(!food){
            return res.status(404).json({
                success:false,
                error:"No food found"
            })
        }
        await food.remove();
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
exports.editFood = async (req, res, next) => {
    try{
        const food = await Foods.findById(req.params.id);
        if(!food){
            return res.status(404).json({
                success:false,
                error:"No food found"
            })
        }
        if (req.body.image != null) {
        food.image = req.body.image;
        }
        if (req.body.name != null) {
        food.name = req.body.name;
        }
        if (req.body.place != null) {
        food.place = req.body.place;
        }
        const updateFood = await food.save();
        return res.status(201).json({
            success: true,
            data: updateFood
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            error:"Server Error"
        })
    }
}