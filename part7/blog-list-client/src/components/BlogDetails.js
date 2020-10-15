import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { getComments } from '../reducers/commentReducer'
import { CommentForm } from './'

const BlogDetails = ({ match }) => {
  const blogID = match.params.id
  const user = useSelector((state) => state.user)
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === blogID)
  )
  const comments = useSelector((state) =>
    state.comments.filter((comment) => comment.blogID === blogID)
  )

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getComments(blogID))
  }, [dispatch])

  const handleLike = async (id) => {
    dispatch(likeBlog(id, title))
  }

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete ${title}`)) return
    dispatch(deleteBlog(id, title))
  }

  if (!blog || !user) return null
  const { url, likes, id, title } = blog
  const showRemoveButton = user.username === blog.user.username
  return (
    <>
      <div>
        <h2>{title}</h2>
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
      <h3>Comments</h3>
      <ul>
        {comments.map(({ comment, id }) => {
          return <li key={id}>{comment}</li>
        })}
      </ul>
      <CommentForm blogID={blogID} />
    </>
  )
}

export default BlogDetails
