import axios from 'axios'
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0,
    }
}

const getAnecdotes = async () => {
    const res = await axios.get('http://localhost:3001/anecdotes')
    return res.data
}

const postAnecdote = async (newAnecdote) => {
    const data = asObject(newAnecdote)
    const res = await axios.post('http://localhost:3001/anecdotes', data)
    return res.data
}

export { getAnecdotes, postAnecdote }
