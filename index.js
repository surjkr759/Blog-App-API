const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const Blog = require('./models/blog')
const User = require('./models/user')
const methodOverride = require('method-override');

const authRoute = require('./routes/auth')
const blogRoute = require('./routes/blog')

const { checkForAuthentication } = require('./middleware/auth')

const app = express()
const PORT = 8000

mongoose.connect('mongodb+srv://surajkr759:z9JtenHwLJl5H1wU@cluster0.trccycl.mongodb.net/blog-app?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('MongoDB connected...'))
.catch((err) => console.log('MongoDB connection failed due to error: ', err))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())
app.use(express.urlencoded())
app.use(methodOverride('_method'));
app.use(cookieParser())
app.use(checkForAuthentication)

app.get('/', async (req, res) => {
    const allBlogs = await Blog.find({})
    let user = null;
    if(req.user){
        user = await User.findById(req.user._id)
    }
    // res.render('index', { blogs: allBlogs, userId: req.user?._id, isAdmin: req.user?.isAdmin })
    res.render('index', { blogs: allBlogs, userId: req.user?._id, isAdmin: req.user?.isAdmin, email: user?.email})
})

app.get('/new', (req, res) => {
    if(req.user) return res.render('new')
    return res.redirect('/login')
})


app.get('/login', (req, res) => res.render('login'))

app.get('/signup', (req, res) => res.render('signup'))

app.get('/logout', (req, res) => res.clearCookie('token').redirect('/'))

app.get('/update/:id', (req, res) => res.render('update', {blogId: req.params.id}))

app.use('/auth', authRoute)
app.use('/blog', blogRoute)

app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`))