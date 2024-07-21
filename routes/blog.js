const express = require('express')
const { handleGetAllBlogs, handleGetBlogById, handleCreateNewBlog, handleDeleteBlogById, handleUpdateBlogById, handleLikeBlogById, handleDisikeBlogById } = require('../controllers/blog')
const { ensureAuthenticated } = require('../middleware/auth')

const router = express.Router()

//Get All Blogs, public route
router.get('/', handleGetAllBlogs)

//Get blog by id, public route
router.get('/:id', handleGetBlogById)

//Create a new blog, protected route
router.post('/', ensureAuthenticated, handleCreateNewBlog)

//Delete a blog by id, protected + authorized route
router.delete('/:id', ensureAuthenticated, handleDeleteBlogById)

//Edit a blog by id, protected + authorized route
router.patch('/:id', ensureAuthenticated, handleUpdateBlogById)

router.patch('/likeblog/:id', handleLikeBlogById)

router.patch('/dislikeblog/:id', handleDisikeBlogById)

module.exports = router
