import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../queries'

const NewBook = ({ setErrorMessage, ...props }) => {
    const [createBook] = useMutation(ADD_BOOK, {
        refetchQueries: [{ query: ALL_AUTHORS }],
        onError: (error) => {
            if (error.graphQLErrors[0]) {
                setErrorMessage(error.graphQLErrors[0].message)
            } else {
                console.log(error.message)
            }
        },
        update: (store, response) => {
            const dataInStore = store.readQuery({ query: ALL_BOOKS })
            store.writeQuery({
                query: ALL_BOOKS,
                data: {
                    ...dataInStore,
                    allBooks: [...dataInStore.allBooks, response.data.addBook],
                },
            })
        },
    })
    const [title, setTitle] = useState('Good Book')
    const [author, setAuthor] = useState('Johnny Smith')
    const [published, setPublished] = useState('2004')
    const [genre, setGenre] = useState('')
    const [genres, setGenres] = useState(['nonfiction'])

    if (!props.show) {
        return null
    }

    const submit = async (event) => {
        event.preventDefault()
        await createBook({
            variables: { title, author, published: Number(published), genres },
        })
        setTitle('')
        setPublished('')
        setAuthor('')
        setGenres([])
        setGenre('')
    }

    const addGenre = () => {
        setGenres(genres.concat(genre))
        setGenre('')
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    title
                    <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    published
                    <input
                        type="number"
                        value={published}
                        onChange={({ target }) => setPublished(target.value)}
                    />
                </div>
                <div>
                    <input
                        value={genre}
                        onChange={({ target }) => setGenre(target.value)}
                    />
                    <button onClick={addGenre} type="button">
                        add genre
                    </button>
                </div>
                <div>genres: {genres.join(' ')}</div>
                <button type="submit">create book</button>
            </form>
        </div>
    )
}

export default NewBook
