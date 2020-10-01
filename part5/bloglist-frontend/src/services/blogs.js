import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

const postBlog = (newBlog) => {
    const { token } = JSON.parse(window.localStorage.getItem('user'))
    const config = { headers: { Authorization: `bearer ${token}` } }
    const request = axios.post(baseUrl, newBlog, config)
    return request.then((res) => res.data)
}

const likePost = (postID) => {
    const url = `${baseUrl}/${postID}/inclike`
    const body = { likeInc: 1 }
    const request = axios.put(url, body)
    return request.then((res) => res.data)
}

export default { getAll, postBlog, likePost }
