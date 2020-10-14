import React, { useState } from 'react'
import BlogDetails from './BlogDetails'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div style={{ padding: '10px' }}>
      {blog.title}: {blog.author}{' '}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'hide' : 'view'}
      </button>
      {showDetails ? <BlogDetails blog={blog} /> : null}
    </div>
  )
}

export default Blog
