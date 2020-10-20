import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const App = () => {
    const [page, setPage] = useState('authors')
    const [token, setToken] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const client = useApolloClient()

    useEffect(() => {
        const userToken = localStorage.getItem('userToken')
        if (userToken) {
            setToken(userToken)
        }
    }, [])

    const handleLogout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
    }

    const LoginButton = () => {
        return <button onClick={() => setPage('login')}>login</button>
    }

    const LogoutButton = () => {
        return <button onClick={handleLogout}>logout</button>
    }

    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                {token ? (
                    <button onClick={() => setPage('add')}>add book</button>
                ) : null}
                {token ? <LogoutButton /> : <LoginButton />}
            </div>
            {errorMessage ? <div>{errorMessage}</div> : null}

            <Authors show={page === 'authors'} />

            <Books show={page === 'books'} />

            {page === 'login' ? (
                <LoginForm setError={setErrorMessage} setToken={setToken} />
            ) : null}

            <NewBook show={page === 'add'} />
        </div>
    )
}

export default App
