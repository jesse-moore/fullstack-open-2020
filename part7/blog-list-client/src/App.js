import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import AddBlog from './components/AddBlog'
import AppMessage from './components/AppMessage'
import Login from './components/Login'
import { initBlogs } from './reducers/blogReducer'
import { checkUser } from './reducers/userReducer'

const App = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(checkUser())
  }, [dispatch])

  return (
    <div>
      <AppMessage />
      <Login />
      {user ? (
        <>
          <BlogList user={user} />
          <br />
          <AddBlog />
        </>
      ) : null}
    </div>
  )
}
export default App
