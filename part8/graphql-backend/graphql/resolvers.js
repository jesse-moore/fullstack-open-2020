const Query = require('./query')
const Mutation = require('./mutation')
const testData = require('../tests/testData')
const { books } = testData

module.exports = {
    Query,
    Author: {
        bookCount: (root) =>
            books.filter((book) => book.author === root.name).length,
    },
    Mutation,
}
