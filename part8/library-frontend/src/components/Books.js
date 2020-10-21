import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, BOOK_GENRES } from '../queries'

const Books = (props) => {
    const [genre, setGenre] = useState('')
    const [getBooks, { loading, data }] = useLazyQuery(ALL_BOOKS)
    const genreQuery = useQuery(BOOK_GENRES)
    const genres = genreQuery.loading ? [] : genreQuery.data.bookGenres

    useEffect(() => {
        if (genre) {
            getBooks({
                variables: { genre },
            })
        } else {
            getBooks()
        }
    }, [getBooks])

    if (!props.show || !data) {
        return null
    }
    if (loading) return <div>...Loading</div>

    const books = data.allBooks
    const genreFilter = (book) => {
        if (!genre) return book
        return book.genres.includes(genre)
    }

    return (
        <div>
            <h2>books</h2>
            <h3>Filter by genre:</h3>
            <div>
                {genres.map((genre) => {
                    return (
                        <button key={genre} onClick={() => setGenre(genre)}>
                            {genre}
                        </button>
                    )
                })}
                <button key="all" onClick={() => setGenre('')}>
                    all
                </button>
            </div>
            <br />
            <table>
                <tbody>
                    <tr>
                        <th>title</th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books.filter(genreFilter).map((a) => (
                        <tr key={a.id}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Books
