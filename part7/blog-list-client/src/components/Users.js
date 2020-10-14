import React, { useEffect, useState } from 'react'
import { userService } from '../services'

export default function Users() {
  const [userPostCount, setUserPostCount] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await userService.getUsersPostCount()
      setUserPostCount(res.data)
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
  const { name, blogs } = user
  return (
    <div>
      <span style={{ marginRight: '100px' }}>{name}</span>
      <span>{blogs}</span>
    </div>
  )
}
