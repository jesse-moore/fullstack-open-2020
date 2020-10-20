const { UserInputError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const Book = require('../models/book')
const Author = require('../models/author')
const User = require('../models/user')
const { SECRET } = require('../utils/config')

module.exports = {
    createUser: async (root, args) => {
        try {
            const user = new User({
                username: args.username,
                favoriteGenre: args.favoriteGenre,
            })
            return await user.save()
        } catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args,
            })
        }
    },
    login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
        if (!user || args.password !== 'password123') {
            throw new UserInputError('wrong credentials')
        }

        const userForToken = {
            username: user.username,
            id: user._id,
        }
        return { value: jwt.sign(userForToken, SECRET) }
    },
    addBook: async (root, args, context) => {
        if (!context.currentUser) {
            throw new UserInputError('Not Authorized')
        }
        try {
            const author = await Author.findOne({ name: args.author })
            if (!author) {
                const newAuthor = await new Author({ name: args.author }).save()
                return await new Book({ ...args, author: newAuthor }).save()
            } else {
                return await new Book({ ...args, author }).save()
            }
        } catch (error) {
            throw new UserInputError(error.message, { invalidArgs: args })
        }
    },
    editAuthor: async (root, args, context) => {
        if (!context.currentUser) {
            throw new UserInputError('Not Authorized')
        }
        try {
            const updatedAuthor = await Author.findOneAndUpdate(
                { name: args.name },
                { born: args.setBornTo },
                { new: true }
            )
            return updatedAuthor
        } catch (error) {
            throw new UserInputError(error.message, { invalidArgs: args })
        }
    },
}
