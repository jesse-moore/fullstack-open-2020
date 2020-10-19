const mongoose = require('mongoose')
const config = require('../utils/config')
const logger = require('../utils/logger')

module.exports = async function () {
    await mongoose
        .connect(config.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            logger.info('connected to MongoDB')
        })
        .catch((error) => {
            logger.error('error connection to MongoDB:', error.message)
        })
}
