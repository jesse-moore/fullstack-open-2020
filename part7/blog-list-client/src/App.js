import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BlogList, AddBlog, AppMessage, Login, Users } from './components/'
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
      <Switch>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          {user ? (
            <>
              <BlogList user={user} />
              <br />
              <AddBlog />
            </>
          ) : null}
        </Route>
      </Switch>
    </div>
  )
}
export default App
