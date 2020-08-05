const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const Users = require('../models/Users');

router.post("/users/register", async (req, res) => {
    const {email, password, passwordCheck, firstName} = req.body
    
    try{
        if(!email || !password || !passwordCheck || !firstName)
            return res.status(400).json({msg: "Not all fields have been entered."})
        if(passwordCheck.length < 8)
            return res.status(400).json({msg: "Password needs to be at least 8 characters long."})
        if(password !== passwordCheck)
            return res.status(400).json({msg: "Passwords do not match."})
        const existingUser = await Users.findOne({email: email})
        if(existingUser)
            return res.status(400).json({msg: "An account with this email already exists."})
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt)
        const user = await Users.create({...req.body, 
            password: passwordHash, primary: 'Blue', secondary: 'Red', theme:false});
        return res.status(200).json(user)
    }catch(err){
        return res.status(500).json({
            error:"Server Error"
        })
    }
})

router.post("/users/login", async (req, res) => {
    const {email, password} = req.body
    
    try{
        if(!email || !password)
        return res.status(400).json({msg: "Not all fields have been entered."})
        
        const user = await Users.findOne({email: email})
        if(!user)
            return res.status(400).json({msg: "No account with this email exists."})

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch)
            return res.status(400).json({msg: "Invalid credentials."})

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            return res.status(200).json({
                token,
                user:{ id: user._id, firstName: user.firstName, 
                primary: user.primary, secondary: user.secondary, theme: user.theme },
            })       
    }catch(err){
        return res.status(500).json({
            error:"Server Error"
        })
    }
})

router.delete("/users/delete", auth, async (req, res) =>{
    try{
        const deleteUser = await Users.findByIdAndDelete(req.user)
        return res.json(deleteUser)

    }catch(err){
        return res.status(500).json({
            error:"Server Error"
        })
    }
})

router.post("/users/tokenValid", async (req, res) =>{
    try{
        const token = req.header("x-auth-token");
        if(!token) return res.json(false)

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if(!verified) return res.json(false)

        const user = await Users.findById(verified.id);
        if(!user) return res.json(false)

        return res.json(true);
    }catch(err){
        return res.status(500).json({
            error:"Server Error"
        })
    }
})

router.get("/users/", auth, async (req, res) =>{
    try{
        const user = await Users.findById(req.user)
        return res.json({
            firstName: user.firstName,
            id: user._id,
            primary: user.primary, 
            secondary: user.secondary, 
            theme: user.theme 
        })
    }catch(err){
        return res.status(500).json({
            error:"Server Error"
        })
    }
})
router.post("/users/:id", auth, async (req, res) =>{
    try{
        const user = await Users.findOne({_id: req.params.id});
        if(!user){
            return res.status(404).json({
                error:"No user found"
            })
        }
        if (req.body.primary != null) {
        user.primary = req.body.primary;
        }
        if (req.body.secondary != null) {
        user.secondary = req.body.secondary;
        }
        if (req.body.theme != null) {
        user.theme = req.body.theme;
        }
        const updateUser = await user.save();
        return res.status(201).json(updateUser)
    }catch(err){
        return res.status(500).json({
            error:"Server Error"
        })
    }
})

module.exports = router