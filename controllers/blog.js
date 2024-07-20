const Blog = require('../models/blog')

exports.handleGetAllBlogs = async (req, res) => {
    const blogs = await Blog.find({})
    return res.json({ status: 'success', data: blogs})
}



exports.handleGetBlogById = async (req, res) => {
    const id = req.params.id
    const blog = await Blog.findById(id)
     
    if(!blog)
        return res.status(404).json({status: 'error', message: `Id ${id} not found`})

    return res.status(200).json({ status: 'success', data: blog})
}


exports.handleCreateNewBlog = async (req, res) => {
    const { title, body } = req.body
    const userId = req.user._id

    const newBlog = await Blog.create({
        title,
        body,
        createdBy: userId
    })

    return res.status(200).json({ status: 'success', message: 'Blog created successfully', data: { id: newBlog._id}})
}