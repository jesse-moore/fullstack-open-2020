import React, { useState } from 'react'
import { loginService } from '../services'

const Login = ({ user, setUser, setAppMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.handleLogin(username, password)
      setUser(user)
    } catch (error) {
      handleError(error)
    }
  }
  const logout = () => {
    loginService.handleLogout()
    setUser(null)
  }
  const handleError = () => {
    setAppMessage({
      message: 'Invalid username or password',
      type: 'alert',
      time: 5000,
    })
    setTimeout(() => {
      setAppMessage({})
    }, 5000)
  }

  return (
    <div>
      <h2>log in to application</h2>
      {user ? (
        <div>
          logged in as {user.name} <button onClick={logout}>logout</button>
        </div>
      ) : (
        <form onSubmit={login}>
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
      )}
    </div>
  )
}
export default Login
