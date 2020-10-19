const testData = require('../tests/testData')
const { v1: uuid } = require('uuid')
const Book = require('../models/book')
const Author = require('../models/author')
const { authors, books } = testData

module.exports = {
    addBook: async (root, args) => {
        const author = await Author.findOne({ name: args.author })

        if (!author) {
            const newAuthor = await new Author({ name: args.author }).save()
            return await new Book({ ...args, author: newAuthor }).save()
        } else {
            return await new Book({ ...args, author }).save()
        }
    },
    editAuthor: async (root, args) => {
        console.log(args)
        const updatedAuthor = await Author.findOneAndUpdate(
            { name: args.name },
            { born: args.setBornTo },
            { new: true }
        )
        return updatedAuthor
    },
}
