import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../reducers/userReducer'

const Login = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(login(username, password))
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div style={{ marginBottom: '25px' }}>
      {user.name ? (
        <div>
          logged in as {user.name}{' '}
          <button onClick={handleLogout}>logout</button>
        </div>
      ) : (
        <>
          <h2>log in to application</h2>
          <form onSubmit={handleLogin}>
            <label>
              username
              <input
                onChange={({ target }) => setUsername(target.value)}
                value={username}
                autoComplete="username"
              />
            </label>
            <br />
            <label>
              password
              <input
                onChange={({ target }) => setPassword(target.value)}
                value={password}
                type="password"
                autoComplete="current-password"
              />
            </label>
            <br />
            <button type="submit">login</button>
          </form>
        </>
      )}
    </div>
  )
}
export default Login
