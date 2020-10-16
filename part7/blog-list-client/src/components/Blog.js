import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import { Card, ListItem, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    width: '500px',
    color: 'black',
    textDecoration: 'none',
  },
}))

const Blog = ({ blog }) => {
  const classes = useStyles()
  return (
    <ListItem key={blog.id}>
      <Card className={classes.card} component={Link} to={`/blogs/${blog.id}`}>
        <Typography variant="body1">
          {blog.title}: {blog.author}
        </Typography>
      </Card>
    </ListItem>
  )
}

export default Blog
