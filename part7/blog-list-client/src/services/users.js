import axios from 'axios'

const getUsersPostCount = async () => {
  try {
    const res = await axios.get('/api/users/postcount')
    return res.data
  } catch (error) {
    console.log(error)
  }
}

const getUserByID = async (id) => {
  try {
    const res = await axios.get(`/api/users/${id}`)
    return res.data
  } catch (error) {
    console.error(error)
    return { error: 'user not found' }
  }
}

export default { getUsersPostCount, getUserByID }
