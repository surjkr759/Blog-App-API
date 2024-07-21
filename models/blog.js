const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    likes: {
        type: Number,
        required: true,
        default: 0
    },
    likedBy: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'users',
        default: []
    },
    dislikes: {
        type: Number,
        required: true,
        default: 0
    },
    dislikedBy: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'users',
        default: []
    }
}, { timestamps: true})


const Blog = mongoose.model('blog', blogSchema)

module.exports = Blog