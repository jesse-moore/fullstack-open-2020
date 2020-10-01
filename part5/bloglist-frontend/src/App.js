import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import AddBlog from './components/AddBlog'
import AppMessage from './components/AppMessage'
import Login from './components/Login'
import { blogService, loginService } from './services/'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [appMessage, setAppMessage] = useState({})

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs))
        const userData = loginService.isLoggedIn()
        if (userData) setUser(userData)
    }, [])

    return (
        <div>
            <AppMessage appMessage={appMessage} setAppMessage={setAppMessage} />
            <Login
                user={user}
                setUser={setUser}
                setAppMessage={setAppMessage}
            />
            {user ? (
                <>
                    <BlogList
                        user={user}
                        blogs={blogs}
                        setBlogs={setBlogs}
                        setAppMessage={setAppMessage}
                    />
                    <br />
                    <AddBlog
                        setBlogs={setBlogs}
                        setAppMessage={setAppMessage}
                    />
                </>
            ) : null}
        </div>
    )
}
export default App
