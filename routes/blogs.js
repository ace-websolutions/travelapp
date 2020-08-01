const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const Blogs = require('../models/Blogs');

router.get('/blogs', auth, async (req, res) => {
    try{
        const blogs = await Blogs.find({userId: req.user});
        return res.status(200).json(blogs)
    }catch(err){
        return res.status(500).json({
            error:"Server Error"
        })
    }
})

router.post('/blogs', auth, async (req, res) => {
    try{
        const {title, date, description} = req.body;
        const newBlog = new Blogs({
            title,
            date,
            description,
            userId:req.user
        })
        const blog = await newBlog.save();
        return res.status(200).json(blog)
    }catch(err){
        return res.status(500).json({
            error:"Server Error"
        })
    }
})

router.delete('/blogs/:id', auth, async (req, res) => {
    try{
        const blog = await Blogs.findOne({userId: req.user, _id: req.params.id});
        if(!blog){
            return res.status(404).json({
                error:"No blog found"
            })
        }
        const deleteBlog = await Blogs.findByIdAndDelete(req.params.id);
        return res.status(200).json(deleteBlog)
    }catch(err){
        return res.status(500).json({
            error:"Server Error"
        })
    }
})

router.patch('/blogs/:id', auth, async (req, res) => {
    try{
        const blog = await Blogs.findOne({userId: req.user, _id: req.params.id});
        if(!blog){
            return res.status(404).json({
                error:"No blog found"
            })
        }
        if (req.body.title != null) {
        blog.title = req.body.title;
        }
        if (req.body.date != null) {
        blog.date = req.body.date;
        }
        if (req.body.description != null) {
        blog.description = req.body.description;
        }
        const updateBlog = await blog.save();
        return res.status(201).json(updateBlog)
    }catch(err){
        return res.status(500).json({
            error:"Server Error"
        })
    }
})

module.exports = router;