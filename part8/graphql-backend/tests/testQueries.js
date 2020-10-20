const { gql } = require('@apollo/client')

const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
            id
        }
    }
`

const ALL_BOOKS = gql`
    query allBooks($author: String, $genre: String) {
        allBooks(author: $author, genre: $genre) {
            title
            author {
                name
            }
            published
            genres
            id
        }
    }
`

const ADD_BOOK = gql`
    mutation createBook(
        $title: String!
        $author: String!
        $published: Int!
        $genres: [String!]!
    ) {
        addBook(
            title: $title
            author: $author
            published: $published
            genres: $genres
        ) {
            title
            author {
                name
                born
                bookCount
            }
            published
            genres
            id
        }
    }
`

const BOOK_COUNT = gql`
    query {
        bookCount
    }
`

const AUTHOR_COUNT = gql`
    query {
        authorCount
    }
`

const EDIT_BIRTH_YEAR = gql`
    mutation changeBirthYear($name: String!, $born: Int!) {
        editAuthor(name: $name, setBornTo: $born) {
            name
            born
        }
    }
`
module.exports = {
    ALL_AUTHORS,
    ALL_BOOKS,
    ADD_BOOK,
    AUTHOR_COUNT,
    BOOK_COUNT,
    EDIT_BIRTH_YEAR,
}
