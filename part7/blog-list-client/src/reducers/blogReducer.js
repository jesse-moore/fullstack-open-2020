/* eslint-disable indent */
import { blogService } from '../services'
import { alertMessage, notifMessage } from './messageReducer'

const reducer = (state = [], action) => {
  const { type, data } = action
  switch (type) {
    case 'INITBLOGS':
      return data.blogs
    case 'CREATE':
      return data.blogs
    case 'DELETE':
      return state.filter((blog) => blog.id !== data.id)
    case 'LIKE':
      return state.map((blog) => {
        return blog.id === data.id ? { ...blog, likes: blog.likes + 1 } : blog
      })
    default:
      return state
  }
}

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    if (blogs.error) {
      dispatch(alertMessage({ message: blogs.error }))
    } else {
      dispatch({
        type: 'INITBLOGS',
        data: { blogs },
      })
    }
  }
}

export const saveNewBlog = (newBlog) => {
  return async (dispatch) => {
    const res = await blogService.postBlog(newBlog)
    if (res.error) {
      dispatch(alertMessage({ message: res.error }))
    } else {
      const blogs = await blogService.getAll()
      dispatch({
        type: 'CREATE',
        data: { blogs },
      })
      dispatch(
        notifMessage({
          message: `Successfully added new blog post ${newBlog.title} by ${newBlog.author}`,
        })
      )
    }
  }
}

export const deleteBlog = (id, title) => {
  return async (dispatch) => {
    const res = await blogService.deleteBlog(id)
    if (res.error) {
      dispatch(alertMessage({ message: res.error }))
    } else {
      dispatch({
        type: 'DELETE',
        data: { id },
      })
      dispatch(
        notifMessage({
          message: `Successfully deleted blog post: ${title}`,
        })
      )
    }
  }
}

export const likeBlog = (id, title) => {
  return async (dispatch) => {
    const res = await blogService.likePost(id)
    if (res.error) {
      dispatch(alertMessage({ message: res.error }))
    } else {
      dispatch({
        type: 'LIKE',
        data: { id },
      })
      dispatch(
        notifMessage({
          message: `Successfully updated blog post: ${title}`,
        })
      )
    }
  }
}

export default reducer
