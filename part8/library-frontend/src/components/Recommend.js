import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = (props) => {
    const result = useQuery(ALL_BOOKS)
    const meResult = useQuery(ME)
    if (result.loading) return <div>...Loading</div>
    if (!props.show || !result.data) {
        return null
    }

    const books = result.data.allBooks
    const user = meResult.data.me
    const recommendFilter = (book) => {
        return book.genres.includes(user.favoriteGenre)
    }

    return (
        <div>
            <h2>recommended books</h2>
            <br />
            <table>
                <tbody>
                    <tr>
                        <th>title</th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books.filter(recommendFilter).map((a) => (
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

export default Recommend
