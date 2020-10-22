const Book = require('../models/book')
const Query = require('./query')
const Mutation = require('./mutation')
const Subscription = require('./subsciption')

module.exports = {
    Query,
    Author: {
        bookCount: async (root) => {
            return root.books.length
        },
    },
    Mutation,
    Subscription,
}
