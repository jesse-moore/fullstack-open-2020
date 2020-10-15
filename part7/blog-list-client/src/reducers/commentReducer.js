/* eslint-disable indent */
import { blogService } from '../services'
import { alertMessage, notifMessage } from './messageReducer'

const reducer = (state = [], action) => {
  const { type, data } = action
  switch (type) {
    case 'GETCOMMENTS':
      return data
    case 'ADDCOMMENT':
      return [...state, data]
    default:
      return state
  }
}

export const saveNewComment = (newComment) => {
  return async (dispatch) => {
    const data = await blogService.postComment(newComment)
    if (data.error) {
      dispatch(alertMessage({ message: data.error }))
    } else {
      dispatch({
        type: 'ADDCOMMENT',
        data: data,
      })
      dispatch(
        notifMessage({
          message: 'Successfully added comment',
        })
      )
    }
  }
}

export const getComments = (id) => {
  return async (dispatch) => {
    const data = await blogService.getComments(id)
    if (data.error) {
      dispatch(alertMessage({ message: data.error }))
    } else {
      console.log(data)
      dispatch({
        type: 'GETCOMMENTS',
        data: data,
      })
    }
  }
}

export default reducer
