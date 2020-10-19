const Book = require('../models/book')
const Author = require('../models/author')
const testData = require('../tests/testData')
const { authors, books: testBooks } = testData

module.exports = {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
        const books = await Book.find({}).populate('author', {
            name: 1,
            born: 1,
		})
		return books
        // const filteredBooks = books.filter((book) => {
        //     const isAuthor = args.author ? args.author === book.author : true
        //     const isGenre = args.genre ? book.genres.includes(args.genre) : true
        //     return isAuthor && isGenre
        // })
        // return filteredBooks.map((book) => {
        //     const author = authors.find((a) => book.author === a.name)
        //     return { ...book, author }
        // })
    },
    allAuthors: async () => {
		return await Author.find({})
	},
}
