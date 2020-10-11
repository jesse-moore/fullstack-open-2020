import React from 'react'
import { connect } from 'react-redux'
import { saveNewAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
    const handleSubmit = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.saveNewAnecdote(anecdote)
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

const mapDispatchToProps = {
    saveNewAnecdote,
}

export default connect(null,mapDispatchToProps)(AnecdoteForm)
