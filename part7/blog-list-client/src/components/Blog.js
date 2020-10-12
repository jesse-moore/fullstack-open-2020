import React, { useState } from 'react'
import { blogService } from '../services'
import BlogDetails from './BlogDetails'

const Blog = ({ blog, setBlogs, setAppMessage, user }) => {
  const [showDetails, setShowDetails] = useState(false)
  const handleLike = async (id) => {
    const update = await blogService.likePost(id)
    setBlogs((blogs) => {
      const blogToUpdate = blogs.filter((blog) => blog.id === id)[0]
      const updatedBlog = { ...blogToUpdate, likes: update.likes }
      return blogs.map((blog) => {
        return blog.id === id ? updatedBlog : blog
      })
    })
  }

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete ${title}`)) return
    try {
      await blogService.deleteBlog(id)
    } catch (error) {
      if (error.response.status === 401)
        return setAppMessage({
          message: `Unauthorized to delete ${title}`,
          type: 'alert',
        })

      setAppMessage({
        message: `Unable to delete ${title}`,
        type: 'alert',
      })
      setTimeout(() => {
        setAppMessage({})
      }, 5000)
    }
    setAppMessage({
      message: `Successfully deleted ${title}`,
    })
    setTimeout(() => {
      setAppMessage({})
    }, 5000)
    setBlogs((blogs) => {
      return blogs.filter((blog) => blog.id !== id)
    })
  }

  return (
    <div style={{ padding: '10px' }}>
      {blog.title}: {blog.author}{' '}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'hide' : 'view'}
      </button>
      {showDetails ? (
        <BlogDetails
          blog={blog}
          handleLike={handleLike}
          handleDelete={handleDelete}
          user={user}
        />
      ) : null}
    </div>
  )
}

export default Blog
