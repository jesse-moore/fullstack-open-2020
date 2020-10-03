import React, { useState } from 'react'

const AddBlogForm = ({ addBlog, setShowForm }) => {
  const [title, setTitle] = useState('Title')
  const [author, setAuthor] = useState('Author')
  const [url, setUrl] = useState('/')

  const handleSubmit = async (event) => {
    event.preventDefault()
    await addBlog({ title, author, url })
    setShowForm(false)
  }
  return (
    <div>
      <h2>Add Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>
          title:
          <input
            onChange={({ target }) => setTitle(target.value)}
            value={title}
          />
        </label>
        <br />
        <label>
          author:
          <input
            onChange={({ target }) => setAuthor(target.value)}
            value={author}
          />
        </label>
        <br />
        <label>
          url:
          <input onChange={({ target }) => setUrl(target.value)} value={url} />
        </label>
        <br />
        <button type="submit">Add Blog</button>
      </form>
    </div>
  )
}

export default AddBlogForm
