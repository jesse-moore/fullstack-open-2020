import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_BIRTH_YEAR } from '../queries'

const Authors = (props) => {
    const result = useQuery(ALL_AUTHORS)
    if (!props.show) return null
    if (result.loading) return <div>...Loading</div>
    const authors = result.data.allAuthors

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                    {authors.map((a) => (
                        <tr key={a.id}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <SetBirthYearForm authors={authors} />
        </div>
    )
}

const SetBirthYearForm = ({ authors }) => {
    const [changeBirthYear] = useMutation(EDIT_BIRTH_YEAR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
    })
    const [birthYear, setBirthYear] = useState('')
    const authorNames = authors.map((a) => a.name)
    const [authorName, setAuthorName] = useState(authorNames[0])

    const handleSubmit = async (event) => {
        event.preventDefault()
        await changeBirthYear({
            variables: { name: authorName, born: Number(birthYear) },
        })
        setBirthYear('')
        setAuthorName(authorNames[0])
    }

    return (
        <div>
            <h2>Set birth year</h2>
            <form onSubmit={handleSubmit}>
                Author:{' '}
                <select
                    onChange={({ target }) => setAuthorName(target.value)}
                    value={authorName}
                >
                    {authorNames.map((name, i) => {
                        return (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        )
                    })}
                </select>
                <br />
                Born:{' '}
                <input
                    value={birthYear}
                    onChange={({ target }) => setBirthYear(target.value)}
                />
                <br />
                <button type="submit">update author</button>
            </form>
        </div>
    )
}

export default Authors
