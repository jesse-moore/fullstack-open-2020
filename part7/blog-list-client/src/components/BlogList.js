import React from 'react'
import { useSelector } from 'react-redux'

import Blog from './Blog'

const BlogList = ({ setAppMessage, user }) => {
  const blogs = useSelector((state) => state.blogs)
  const blogSort = (blogA, blogB) => {
    return blogB.likes - blogA.likes
  }
  return (
    <div>
      <h2>blogs</h2>
      {blogs.sort(blogSort).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          setAppMessage={setAppMessage}
          user={user}
        />
      ))}
    </div>
  )
}

export default BlogList
