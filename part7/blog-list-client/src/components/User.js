import React, { useEffect, useState } from 'react'
import { userService } from '../services'

export default function User({ match }) {
  const [user, setUser] = useState({})
  const userID = match.params.id

  useEffect(() => {
    const fetchData = async () => {
      const data = await userService.getUserByID(userID)
      setUser(data)
    }
    fetchData()
  }, [userID])

  if (user.error) return <UserError {...user} />
  if (!user.name) return null
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => {
          return <li key={blog.id}>{blog.title}</li>
        })}
      </ul>
    </div>
  )
}

const UserError = ({ error }) => {
  return <div>{error}</div>
}
