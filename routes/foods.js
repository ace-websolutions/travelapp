const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const Foods = require('../models/Foods');

router.get('/foods', auth, async (req, res) => {
    try{
        const foods = await Foods.find({userId: req.user});
        return res.status(200).json(foods)
    }catch(err){
        return res.status(500).json({
            error:"Server Error"
        })
    }
})

router.post('/foods', auth, async (req, res) => {
    try{
        const { image, name, place } = req.body;
        const newFood = new Foods({
            image,
            name,
            place,
            userId:req.user
        })
        const food = await newFood.save();
        return res.status(200).json(food)
    }catch(err){
        return res.status(500).json({
            error:"Server Error"
        })
    }
})

router.delete('/foods/:id', auth, async (req, res) => {
    try{
        const food = await Foods.findOne({userId: req.user, _id: req.params.id});
        if(!food){
            return res.status(404).json({
                error:"No food found"
            })
        }
        const deleteFood = await Foods.findByIdAndDelete(req.params.id);
        return res.status(200).json(deleteFood)
    }catch(err){
        return res.status(500).json({
            error:"Server Error"
        })
    }
})

router.patch('/foods/:id', auth, async (req, res) => {
    try{
        const food = await Foods.findOne({userId: req.user, _id: req.params.id});
        if(!food){
            return res.status(404).json({
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
        return res.status(201).json(updateFood)
    }catch(err){
        return res.status(500).json({
            error:"Server Error"
        })
    }
})

module.exports = router;