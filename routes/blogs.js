const express = require('express');
const router = express.Router();

const {getBlogs, addBlog, deleteBlog, editBlog} = require('../controllers/blogs');

router.route('/blogs').get(getBlogs).post(addBlog);
router.route('/blogs/:id').delete(deleteBlog).patch(editBlog);

module.exports = router;