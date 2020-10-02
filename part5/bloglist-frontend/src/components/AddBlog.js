import React, { useState } from 'react'
import { blogService } from '../services'

const AddBlog = ({ setBlogs, setAppMessage }) => {
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('Title')
  const [author, setAuthor] = useState('Author')
  const [url, setUrl] = useState('/')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.postBlog({ title, author, url })
      setBlogs((blogs) => {
        return [...blogs, newBlog]
      })
      setAppMessage({
        message: `Successfully added new blog post ${title} by ${author}`,
        type: 'notif',
      })
      setTitle('')
      setAuthor('')
      setUrl('')
      setShowForm(false)
    } catch (error) {
      console.error(error.message)
      setAppMessage({
        message: `Error adding new blog post ${title}`,
        type: 'alert',
      })
    }
  }

  const AddBlogForm = () => {
    return (
      <div>
        <h2>Add Blog</h2>
        <form onSubmit={handleSubmit}>
                    title:
          <input
            onChange={({ target }) => setTitle(target.value)}
            value={title}
          />
          <br />
                    author:
          <input
            onChange={({ target }) => setAuthor(target.value)}
            value={author}
          />
          <br />
                    url:
          <input
            onChange={({ target }) => setUrl(target.value)}
            value={url}
          />
          <br />
          <button type="submit">Add Blog</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add Blog'}
      </button>
      {showForm ? <AddBlogForm /> : null}
    </div>
  )
}

export default AddBlog
