import React, { useState } from 'react'
import AddBlogForm from './AddBlogForm'

const AddBlog = ({ addBlog }) => {
  const [showForm, setShowForm] = useState(false)
  return (
    <div>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add Blog'}
      </button>
      {showForm ? (
        <AddBlogForm addBlog={addBlog} setShowForm={setShowForm} />
      ) : null}
    </div>
  )
}

export default AddBlog
