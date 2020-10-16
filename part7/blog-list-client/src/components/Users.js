import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { userService } from '../services'

import { makeStyles } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {
    width: '400px',
  },
}))

export default function Users() {
  const classes = useStyles()
  const [userPostCount, setUserPostCount] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await userService.getUsersPostCount()
      setUserPostCount(data)
    }
    fetchData()
  }, [])

  return (
    <Table className={classes.root}>
      <TableHead>
        <TableRow>
          <TableCell>User</TableCell>
          <TableCell>Blogs Created</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {userPostCount.map((user) => (
          <User {...user} key={user.name} />
        ))}
      </TableBody>
    </Table>
  )
}

const User = (user) => {
  const { name, blogs, id } = user
  return (
    <TableRow>
      <TableCell>
        <Link to={`users/${id}`}>{name}</Link>
      </TableCell>
      <TableCell>{blogs}</TableCell>
    </TableRow>
  )
}
