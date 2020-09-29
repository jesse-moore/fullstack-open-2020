const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')
const User = require('../models/user')

module.exports = async (token) => {
    const decodedToken = jwt.verify(token, SECRET)
    if (!token || !decodedToken)
        throw {
            name: 'AuthorizationError',
            message: 'valid authorization token required',
        }
    return await User.findById(decodedToken.id)
}
