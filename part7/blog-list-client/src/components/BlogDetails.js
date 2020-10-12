import React from 'react'

const BlogDetails = ({ blog, handleLike, handleDelete, user }) => {
  const { url, likes, id, title } = blog
  const showRemoveButton = user.username === blog.user.username
  return (
    <div>
      <div>
        <span style={{ fontWeight: 'bold' }}>URL:</span> {url}
      </div>
      <div>
        <span style={{ fontWeight: 'bold' }}>Likes:</span> {likes}{' '}
        <button onClick={() => handleLike(id)}>like</button>
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
