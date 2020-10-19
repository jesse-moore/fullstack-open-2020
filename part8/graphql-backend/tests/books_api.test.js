const { ApolloClient, HttpLink, InMemoryCache } = require('@apollo/client')
const mongoose = require('mongoose')
const fetch = require('cross-fetch')
const initDB = require('./initDB')
const Author = require('../models/author')
const Book = require('../models/book')
const {
    ALL_BOOKS,
    ALL_AUTHORS,
    ADD_BOOK,
    BOOK_COUNT,
    AUTHOR_COUNT,
    EDIT_BIRTH_YEAR,
} = require('./testQueries')

const testData = require('../tests/testData')
const { authors: testAuthors, books: testBooks } = testData

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: 'http://localhost:4000',
        fetch,
    }),
    onError: (e) => {
        console.log(e)
    },
})

beforeAll(async () => {
    // const newAuthor = new Author({
    //     name: testAuthors[0].name,
    //     born: testAuthors[0].born,
    // })
    // await newAuthor.save()
    // await Author.deleteMany({})
    // await initDB()
    // const savePromises = testBooks.map(
    //     async ({ title, published, author, genres }) => {
    //         const newBookAuthor = await Author.findOne({ name: author })
    //         const newBook = new Book({
    //             genres,
    //             published,
    //             title,
    //             author: newBookAuthor,
    //         })
    //         return newBook.save()
    //     }
    // )
    // return await Promise.all(savePromises)
})

describe('retrieving books and authors', () => {
    test('allBooks query', async () => {
        const result = await client.query({ query: ALL_BOOKS })
        const books = result.data.allBooks
        expect(books).toBeDefined()
    })
    test('bookCount', async () => {
        const result = await client.query({ query: BOOK_COUNT })
        console.log(result.data.bookCount)
        expect(1).toBe(1)
    })
    test('authorCount', async () => {
        const result = await client.query({ query: AUTHOR_COUNT })
        console.log(result.data.authorCount)
        expect(1).toBe(1)
    })
})

describe('mutating books', () => {
    test('addBook mutation', async () => {
        const newBook = {
            title: 'New Book3',
            published: 2020,
            author: 'Janie Smith',
            genres: ['nonfiction'],
        }
        const result = await client.mutate({
            mutation: ADD_BOOK,
            variables: newBook,
        })
        const book = result.data.addBook
        console.log(book)
        expect(book).toBeDefined()
    })
    test.only('editBirthYear mutation', async () => {
        const result = await client.mutate({
            mutation: EDIT_BIRTH_YEAR,
            variables: { name: 'Robert Martin', born: 1990 },
        })
        const author = result.data.editAuthor
        console.log(author)
        expect(author.born).toBe(1990)
    })
})

describe('retrieving authors', () => {
    test('allAuthors query', async () => {
        const result = await client.query({ query: ALL_AUTHORS })
        const authors = result.data.allAuthors
        expect(authors).toBeDefined()
    })
})

afterAll(() => {
    // mongoose.connection.close()
})
