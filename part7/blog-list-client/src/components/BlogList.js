import React from 'react'
import { useSelector } from 'react-redux'

import { List } from '@material-ui/core'
import Blog from './Blog'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const blogSort = (blogA, blogB) => {
    return blogB.likes - blogA.likes
  }
  return (
    <div>
      <h2>blogs</h2>
      <List>
        {blogs.sort(blogSort).map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </List>
    </div>
  )
}

export default BlogList
