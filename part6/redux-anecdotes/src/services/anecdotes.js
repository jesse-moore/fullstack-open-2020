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

const upvoteAnecdote = async ({ id, votes, ...rest }) => {
    const data = { id, votes: votes + 1, ...rest }
    const config = { header: { 'Content-Type': 'application/json' } }
    const res = await axios.put(
        `http://localhost:3001/anecdotes/${id}`,
        data,
        config
    )
    return res.data
}

export { getAnecdotes, postAnecdote, upvoteAnecdote }
