const User = require('../models/user')

const crypto = require('crypto')
const { generateToken } = require('../lib/auth')

exports.handleSignupRequest = async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    try {
        const salt = crypto.randomBytes(256).toString('hex')
        const hashedPassword = crypto.createHmac('sha256', salt).update(password).digest('hex')
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            salt
        })
        return res.status(200).json({message: 'success', data: {_id: newUser._id}})
    } catch (err) {
        return res.json({ error: err})
    }
}

exports.handleSigninRequest = async (req, res) => {
    const { email, password } = req.body

    const userInDb = await User.findOne({ email})
    if(!userInDb)
        return res.status(404).json({status: 'error', message: 'Email does not exist'})

    const salt = userInDb.salt
    const passwordInDb = userInDb.password
    console.log('Salt ', salt)
    const hashedPassword = crypto.createHmac('sha256', salt).update(password).digest('hex')

    if(passwordInDb !== hashedPassword)
        return res.status(401).json({status: 'error', message: 'Email or password is incorrect'})

    const token = generateToken({ _id: userInDb._id })

    return res.status(200).json({ status: 'success', data: token})
}