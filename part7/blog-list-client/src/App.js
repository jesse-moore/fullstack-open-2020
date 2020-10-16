import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  BlogList,
  BlogDetails,
  AddBlog,
  AppMessage,
  Users,
  User,
  Navigation,
  Login,
} from './components/'
import { initBlogs } from './reducers/blogReducer'
import { checkUser } from './reducers/userReducer'

import { Container } from '@material-ui/core'

const App = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(checkUser())
  }, [dispatch])

  return (
    <Container maxsize="lg">
      <div>
        <AppMessage />
        <Navigation />
        <Switch>
          <Route path="/users/:id" component={User} />
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/blogs/:id" component={BlogDetails} />
          <Route path="/login">
            <Login />
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
    </Container>
  )
}
export default App
