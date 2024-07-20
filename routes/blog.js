const express = require('express')
const { handleGetAllBlogs, handleGetBlogById, handleCreateNewBlog } = require('../controllers/blog')
const { ensureAuthenticated } = require('../middleware/auth')

const router = express.Router()

//Get All Blogs, public route
router.get('/', handleGetAllBlogs)

//Get blog by id, public route
router.get('/:id', handleGetBlogById)

//Create a new blog, protected route
router.post('/', ensureAuthenticated, handleCreateNewBlog)

//Delete a blog by id, protected + authorized route
// router.delete('/:id')

//Edit a blog by id, protected + authorized route
// router.patch('/:id')

module.exports = router
