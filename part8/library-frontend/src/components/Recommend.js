import React, { useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = (props) => {
    const meQuery = useQuery(ME)
    const [getBooks, { loading: isBooksLoading, data: books }] = useLazyQuery(
        ALL_BOOKS
    )
    useEffect(() => {
        if (meQuery.loading || !meQuery.data.me) return
        const genre = meQuery.data.me.favoriteGenre
        getBooks({ variables: { genre } })
    }, [meQuery, getBooks])

	if (!props.show) return null
    if (isBooksLoading || meQuery.loading || !books) return <div>...Loading</div>
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
                    {books.allBooks.map((a) => (
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
