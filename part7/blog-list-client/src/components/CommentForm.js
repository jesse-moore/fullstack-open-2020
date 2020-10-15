import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveNewComment } from '../reducers/commentReducer'

export default function CommentForm({ blogID }) {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(saveNewComment({ blogID, comment }))
    setComment('')
  }
  return (
    <div>
      <h2>Add Comment</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            onChange={({ target }) => setComment(target.value)}
            value={comment}
          />
        </label>
        <br />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  )
}
