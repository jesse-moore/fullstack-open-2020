import axios from 'axios'

const handleLogin = async (username, password) => {
  try {
    const { data } = await axios.post('/api/login', {
      username,
      password,
    })
    const user = {
      name: data.name,
      username: data.username,
      token: data.token,
    }
    window.localStorage.setItem('user', JSON.stringify(user))
    return user
  } catch (error) {
    return { error: 'Invalid Username or Password' }
  }
}

const handleLogout = () => {
  window.localStorage.removeItem('user')
}

const isLoggedIn = () => {
  const user = window.localStorage.getItem('user')
  return user ? JSON.parse(user) : {}
}

export default { handleLogin, handleLogout, isLoggedIn }
