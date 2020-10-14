import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveNewBlog } from '../reducers/blogReducer'

const AddBlogForm = ({ setShowForm }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(saveNewBlog({ title, author, url }))
    await setShowForm(false)
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
