import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
            id
        }
    }
`

export const ALL_BOOKS = gql`
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

export const ADD_BOOK = gql`
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

export const EDIT_BIRTH_YEAR = gql`
    mutation changeBirthYear($name: String!, $born: Int!) {
        editAuthor(name: $name, setBornTo: $born) {
            name
            born
        }
    }
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`
