const express = require('express')
const mongoose = require('mongoose')

const authRoute = require('./routes/auth')
const blogRoute = require('./routes/blog')

const { checkForAuthentication } = require('./middleware/auth')

const app = express()
const PORT = 8000

mongoose.connect('mongodb+srv://surajkr759:z9JtenHwLJl5H1wU@cluster0.trccycl.mongodb.net/blog-app?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('MongoDB connected...'))
.catch((err) => console.log('MongoDB connection failed due to error: ', err))

app.use(express.json())
app.use(checkForAuthentication)

app.use('/auth', authRoute)
app.use('/blog', blogRoute)

app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`))