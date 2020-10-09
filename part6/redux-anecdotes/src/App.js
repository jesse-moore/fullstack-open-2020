import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AnecdoteForm, AnecdoteList, Notification, Filter } from './components'
import { initAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initAnecdotes())
    }, [dispatch])
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
