import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  return (
    <div style={{ padding: '10px' }}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title}: {blog.author}
      </Link>
    </div>
  )
}

export default Blog
