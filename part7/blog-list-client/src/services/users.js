import axios from 'axios'

const getUsersPostCount = async () => {
  try {
    const usersPostCount = await axios.get('/api/users/postcount')
    return usersPostCount
  } catch (error) {
    console.log(error)
  }
}

export default { getUsersPostCount }
