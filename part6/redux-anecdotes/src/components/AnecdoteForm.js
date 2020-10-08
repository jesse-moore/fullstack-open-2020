import React from 'react'
import { useDispatch } from 'react-redux'
import { saveNewAnecdote } from '../reducers/anecdoteReducer'
import { postAnecdote } from '../services/anecdotes'

export default () => {
    const dispatch = useDispatch()

    const handleSubmit = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await postAnecdote(anecdote)
        console.log(newAnecdote)
        dispatch(saveNewAnecdote(newAnecdote))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input name="anecdote" />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}
