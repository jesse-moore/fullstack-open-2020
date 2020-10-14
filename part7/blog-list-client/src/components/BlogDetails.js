import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const BlogDetails = ({ blog }) => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const handleLike = async (id) => {
    dispatch(likeBlog(id, title))
  }

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete ${title}`)) return
    dispatch(deleteBlog(id, title))
  }
  const { url, likes, id, title } = blog
  const showRemoveButton = user.username === blog.user.username
  return (
    <div>
      <div>
        <span style={{ fontWeight: 'bold' }}>URL:</span> {url}
      </div>
      <div>
        <span style={{ fontWeight: 'bold' }}>Likes:</span> {likes}{' '}
        <button onClick={() => handleLike(id, title)}>like</button>
      </div>
      <div>
        <span style={{ fontWeight: 'bold' }}>Submitted By:</span>{' '}
        {blog.user.name}
      </div>
      {showRemoveButton ? (
        <button onClick={() => handleDelete(id, title)}>remove</button>
      ) : null}
    </div>
  )
}

export default BlogDetails
