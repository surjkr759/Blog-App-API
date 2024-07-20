const express = require('express')
const router = express.Router()
const { handleSignupRequest, handleSigninRequest } = require('../controllers/auth')

router.post('/signup', handleSignupRequest)
router.post('/signin', handleSigninRequest)

module.exports = router