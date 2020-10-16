import React, { useEffect, useState } from 'react'
import { userService } from '../services'

import { makeStyles } from '@material-ui/core/styles'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {
    width: '400px',
  },
}))

export default function User({ match }) {
  const classes = useStyles()
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
    <>
      <h2>{user.name}</h2>
      <Table className={classes.root}>
        <TableHead>
          <TableRow>
            <TableCell>Added blogs</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.blogs.map((blog) => {
            return (
              <TableRow key={blog.id}>
                <TableCell>{blog.title}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  )
}

const UserError = ({ error }) => {
  return <div>{error}</div>
}
