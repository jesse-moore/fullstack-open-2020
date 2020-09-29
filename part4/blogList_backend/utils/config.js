require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI =
    process.env.NODE_ENV === 'production'
        ? process.env.MONGODB_URI
        : process.env.TEST_MONGODB_URI
const SECRET = process.env.SECRET
module.exports = {
    MONGODB_URI,
    PORT,
    SECRET,
}
