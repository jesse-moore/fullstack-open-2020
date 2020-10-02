import React from 'react'
import PropTypes from 'prop-types'
import Blog from './Blog'

const BlogList = ({ blogs, setBlogs, setAppMessage, user }) => {
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
          setBlogs={setBlogs}
          setAppMessage={setAppMessage}
          user={user}
        />
      ))}
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  setAppMessage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default BlogList