const JWT = require('jsonwebtoken')

const JWT_SECRET_KEY = '@mySecretKey@Scaler12644'

exports.generateToken = (data) => {
    const payload = JSON.stringify(data)
    const token = JWT.sign(payload, JWT_SECRET_KEY)
    return token
}


exports.validateToken = (token) => {
    try {
        const data = JWT.verify(token, JWT_SECRET_KEY)
        return data
    } catch(err) {
        return null
    }
    
}