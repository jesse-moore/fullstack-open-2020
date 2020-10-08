import React from 'react'
import { AnecdoteForm, AnecdoteList } from './components'

const App = () => {
    return (
        <div>
            <h2>Anecdotes</h2>
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    )
}

export default App
