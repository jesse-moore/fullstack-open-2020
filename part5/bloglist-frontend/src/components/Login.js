import React, { useState } from 'react'
import { loginService } from '../services'

const Login = ({ user, setUser, setAppMessage }) => {
  const [username, setUsername] = useState('johnny82')
  const [password, setPassword] = useState('password123')
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
  }

  const LoginForm = () => {
    return (
      <form onSubmit={login}>
                username
        <input
          onChange={({ target }) => setUsername(target.value)}
          value={username}
        />
        <br />
                password
        <input
          onChange={({ target }) => setPassword(target.value)}
          value={password}
          type="password"
        />
        <br />
        <button type="submit">login</button>
      </form>
    )
  }

  const User = ({ name }) => {
    return (
      <div>
                logged in as {name} <button onClick={logout}>logout</button>
      </div>
    )
  }

  return (
    <div>
      <h2>log in to application</h2>
      {user ? <User name={user.name} /> : <LoginForm />}
    </div>
  )
}
export default Login
