const Blogs = require('../models/Blogs');

exports.getBlogs = async (req, res, next) => {
    try{
        const blogs = await Blogs.find();
        return res.status(200).json({
            success: true,
            count: blogs.length,
            data: blogs
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            error:"Server Error"
        })
    }
}
exports.addBlog = async (req, res, next) => {
    try{
        const blog = await Blogs.create(req.body);
        return res.status(200).json({
            success: true,
            data: blog
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            error:"Server Error"
        })
    }
}
exports.deleteBlog = async (req, res, next) => {
    try{
        const blog = await Blogs.findById(req.params.id);
        if(!blog){
            return res.status(404).json({
                success:false,
                error:"No blog found"
            })
        }
        await blog.remove();
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
exports.editBlog = async (req, res, next) => {
    try{
        const blog = await Blogs.findById(req.params.id);
        if(!blog){
            return res.status(404).json({
                success:false,
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
        return res.status(201).json({
            success: true,
            data: updateBlog
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            error:"Server Error"
        })
    }
}