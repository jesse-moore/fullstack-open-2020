const { UserInputError } = require('apollo-server')
const Book = require('../models/book')
const Author = require('../models/author')

module.exports = {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
        try {
            if (args.author && args.genre) {
                const author = await Author.findOne({ name: args.author })
                if (!author)
                    throw new UserInputError(
                        `Author "${args.author}" not found`,
                        { invalidArgs: args }
                    )
                return await Book.find({
                    author: author,
                    genres: { $in: args.genre },
                }).populate('author', {
                    name: 1,
                    born: 1,
                })
            } else if (args.author) {
                const author = await Author.findOne({ name: args.author })
                if (!author) throw Error()
                return await Book.find({
                    author: author,
                }).populate('author', {
                    name: 1,
                    born: 1,
                })
            } else if (args.genre) {
                return await Book.find({
                    genres: { $in: args.genre },
                }).populate('author', {
                    name: 1,
                    born: 1,
                })
            } else {
                return await Book.find({}).populate('author', {
                    name: 1,
                    born: 1,
                })
            }
        } catch (error) {
            throw new UserInputError(error.message, { invalidArgs: args })
        }
    },
    allAuthors: async () => {
        return await Author.find({})
    },
    me: (root, args, context) => {
        return context.currentUser
    },
}
