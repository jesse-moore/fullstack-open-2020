import React from 'react'
import { Link } from 'react-router-dom'
import { Login } from './'

export default function Navigation() {
  return (
    <div>
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/users">
          <li>Users</li>
        </Link>
      </ul>
      <Login />
    </div>
  )
}
