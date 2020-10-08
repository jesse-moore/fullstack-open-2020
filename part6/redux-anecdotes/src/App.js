import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AnecdoteForm, AnecdoteList, Notification, Filter } from './components'
import { getAnecdotes } from './services/anecdotes'
import { initAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        async function fetchData() {
            const anecdotes = await getAnecdotes()
            dispatch(initAnecdotes(anecdotes))
        }
        fetchData()
    }, [])
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
