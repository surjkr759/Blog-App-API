const Blog = require('../models/blog')
const User = require('../models/user')

exports.handleGetAllBlogs = async (req, res) => {
    const blogs = await Blog.find({})
    return res.json({ status: 'success', data: blogs})
}



exports.handleGetBlogById = async (req, res) => {
    const id = req.params.id
    const blog = await Blog.findById(id)
     
    if(!blog)
        return res.status(404).json({status: 'error', message: `Id ${id} not found`})

    // return res.status(200).json({ status: 'success', data: blog})
    return res.render('blog', {blog})
}


exports.handleCreateNewBlog = async (req, res) => {
    const { title, body } = req.body
    const userId = req.user._id

    const newBlog = await Blog.create({
        title,
        body,
        createdBy: userId
    })

    // return res.status(200).json({ status: 'success', message: 'Blog created successfully', data: { id: newBlog._id}})
    return res.redirect(`/blog/${newBlog.id}`)
}


exports.handleDeleteBlogById = async (req, res) => {
    const blogId = req.params.id
    const userId = req.user._id

    try {
        const user = await User.findById(userId)
        const blog = await Blog.findById(blogId)

        if(user.isAdmin || JSON.stringify(userId) === JSON.stringify(blog.createdBy)) {
            await Blog.findByIdAndDelete(blogId)
            return res.redirect('/')
            // return res.status(200).json({status: 'success', message: 'Blog Deleted'})
        }
        
        // return res.status(401).json({status: 'error', message: 'You are not authorized to delete the blog'})
    } catch (err) {
        return res.redirect('/',  {error: err})
        // return res.status(500).json({status: 'error', message: err.message})
    }
}


exports.handleUpdateBlogById = async (req, res) => {
    const blogId = req.params.id
    const userId = req.user._id

    try {
        const user = await User.findById(userId)
        const blog = await Blog.findById(blogId)

        // if(userId !== blogCreatedBy)
        //     return res.status(401).json({status: 'error', message: 'You are not authorized to update the blog'})
    
        if(user.isAdmin || JSON.stringify(userId) === JSON.stringify(blog.createdBy)) {
            const { title, body } = req.body
            await Blog.findByIdAndUpdate(
                blogId,
                { title, body }
            )
            return res.redirect(`/blog/${blogId}`)
            // return res.status(200).json({status: 'success', message: 'Blog Deleted'})
        }

        // return res.status(200).json({status: 'success', data: updatedBlog})
    } catch(err) {
        return res.redirect('/update',  {error: err})
    }
    
}


exports.handleLikeBlogById = async (req, res) => {
    const blogId = req.params.id
    const userId = req.user._id

    try{
        const blog = await Blog.findById(blogId)

        if(blog.likedBy.includes(userId))
            return res.render('blog', {
                blog,
                error: 'You have already liked this post'
            })
            // return res.status(400).json({status: 'error', message: 'You have already liked this post'})

        if(blog.dislikedBy.includes(userId)) {
            blog.dislikes -= 1
            blog.dislikedBy = blog.dislikedBy.filter(user => !user.equals(userId))
        }

        blog.likes += 1
        blog.likedBy.push(userId)
        
        const updatedBlog = await blog.save()

        return res.status(200).json({status: 'success', data: updatedBlog})
    } catch(err) {
        return res.status(500).json({status: 'error', message: err.message})
    }    
}


exports.handleDisikeBlogById = async (req, res) => {
    const blogId = req.params.id
    const userId = req.user._id

    try{
        const blog = await Blog.findById(blogId)

        if(blog.dislikedBy.includes(userId))
            return res.render('blog', {
                blog,
                error: 'You have already disliked this post'
            })
            // return res.status(400).json({status: 'error', message: 'You have already disliked this post'})

        if(blog.likedBy.includes(userId)) {
            blog.likes -= 1
            blog.likedBy = blog.likedBy.filter(user => !user.equals(userId))
        }

        blog.dislikes += 1
        blog.dislikedBy.push(userId)
        
        const updatedBlog = await blog.save()

        return res.status(200).json({status: 'success', data: updatedBlog})
    } catch(err) {
        return res.status(500).json({status: 'error', message: err.message})
    }
}
