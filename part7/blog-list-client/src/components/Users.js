import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { userService } from '../services'

export default function Users() {
  const [userPostCount, setUserPostCount] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await userService.getUsersPostCount()
      setUserPostCount(data)
    }
    fetchData()
  }, [])

  return (
    <div>
      <div style={{ fontWeight: 'bold' }}>
        <span style={{ marginRight: '100px' }}>User</span>
        <span>Blogs created</span>
      </div>
      {userPostCount.map((user) => (
        <User {...user} key={user.name} />
      ))}
    </div>
  )
}

const User = (user) => {
  const { name, blogs, id } = user
  return (
    <div>
      <Link to={`users/${id}`}>
        <span style={{ marginRight: '100px' }}>{name}</span>
      </Link>
      <span>{blogs}</span>
    </div>
  )
}
