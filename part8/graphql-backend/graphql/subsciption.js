const pubsub = require('./pubsub')

module.exports = {
    bookAdded: {
        subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
}
