import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  try {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
  } catch (error) {
    return { error: 'Error retrieving blogs' }
  }
}

const postBlog = (newBlog) => {
  try {
    const { token } = JSON.parse(window.localStorage.getItem('user'))
    const config = { headers: { Authorization: `bearer ${token}` } }
    const request = axios.post(baseUrl, newBlog, config)
    return request.then((res) => res.data)
  } catch (error) {
    return { error: `Error adding post ${newBlog.title}` }
  }
}

const likePost = (postID) => {
  try {
    const url = `${baseUrl}/${postID}/inclike`
    const body = { likeInc: 1 }
    const request = axios.put(url, body)
    return request.then((res) => res.data)
  } catch (error) {
    return { error: 'Error updating post' }
  }
}

const deleteBlog = (postID) => {
  try {
    const url = `${baseUrl}/${postID}`
    const { token } = JSON.parse(window.localStorage.getItem('user'))
    const config = { headers: { Authorization: `bearer ${token}` } }
    const request = axios.delete(url, config)
    return request.then((req) => req.status)
  } catch (error) {
    return { error: 'Error deleting post' }
  }
}

export default { getAll, postBlog, likePost, deleteBlog }
