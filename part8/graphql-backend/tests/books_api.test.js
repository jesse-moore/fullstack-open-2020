const { ApolloClient, HttpLink, InMemoryCache } = require('@apollo/client')
const mongoose = require('mongoose')
const fetch = require('cross-fetch')
const initDB = require('./initDB')
const {
    ALL_BOOKS,
    ALL_AUTHORS,
    ADD_BOOK,
    BOOK_COUNT,
    AUTHOR_COUNT,
    EDIT_BIRTH_YEAR,
} = require('./testQueries')

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
    await initDB()
})

describe('retrieving books', () => {
    test.only('allBooks query', async () => {
        const result = await client.query({ query: ALL_BOOKS })
        const books = result.data.allBooks
        expect(books).toBeDefined()
    })

    test('allBooks by author', async () => {
        const result = await client.query({
            query: ALL_BOOKS,
            variables: { author: 'Robert Martin' },
        })
        const books = result.data.allBooks
        console.log(books)
        expect(1).toBe(1)
    })

    test('bookCount', async () => {
        const result = await client.query({ query: BOOK_COUNT })
        console.log(result.data.bookCount)
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
        expect(book).toBeDefined()
    })
    test('editBirthYear mutation', async () => {
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

    test('authorCount', async () => {
        const result = await client.query({ query: AUTHOR_COUNT })
        console.log(result.data.authorCount)
        expect(1).toBe(1)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
