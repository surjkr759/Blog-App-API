const JWT = require('jsonwebtoken')
const { validateToken } = require('../lib/auth')

exports.checkForAuthentication = (req, userPayload, next) => {
    // const authorizationHeader = req.headers['Authorization'] || req.headers['authorization']
    // const token = authorizationHeader.split('Bearer ')[1]

    const token = req.cookies['token']

    if(!token) {
        req.user = null
        return next()
    }

    const payload = validateToken(token)

    req.user = payload
    
    return next()
}


exports.ensureAuthenticated = (req, res, next) => {
    if(!req.user)
        return res.status(401).json({status: 'error', message: 'User not authenticated'})
    
    return next()
}

