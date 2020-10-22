const mongoose = require('mongoose')
const Author = require('../models/author')
const Book = require('../models/book')
const config = require('../utils/config')
const logger = require('../utils/logger')
const testData = require('../tests/testData')
const { authors: testAuthors, books: testBooks } = testData

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
    await Author.deleteMany({})
    await Book.deleteMany({})

    const authorPromises = testAuthors.map((author) => {
        const { name, born } = author
        return new Author({ name, born }).save()
    })

    await Promise.all(authorPromises)

    const bookPromises = testBooks.map(async ({ title, published, author, genres }) => {
        const newBookAuthor = await Author.findOne({ name: author })
        const book = await new Book({
            genres,
            published,
            title,
            author: newBookAuthor,
        }).save()
		return newBookAuthor.updateOne({ $push: { books: book.id } })
    })
    await Promise.all(bookPromises)
}
