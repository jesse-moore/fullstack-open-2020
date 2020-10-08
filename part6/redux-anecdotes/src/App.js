import React from 'react'
import { AnecdoteForm, AnecdoteList, Notification, Filter } from './components'

const App = () => {
    return (
        <div>
            <h2>Anecdotes</h2>
            <Notification />
            <Filter />
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    )
}

export default App
