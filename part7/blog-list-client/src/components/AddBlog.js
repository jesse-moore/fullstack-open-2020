import React, { useState } from 'react'
import AddBlogForm from './AddBlogForm'

import { Button } from '@material-ui/core'

const AddBlog = ({ addBlog }) => {
  const [showForm, setShowForm] = useState(false)
  return (
    <div>
      <Button onClick={() => setShowForm(!showForm)} variant="contained">
        {showForm ? 'Cancel' : 'Add Blog'}
      </Button>
      {showForm ? (
        <AddBlogForm addBlog={addBlog} setShowForm={setShowForm} />
      ) : null}
    </div>
  )
}

export default AddBlog
