import {
    getAnecdotes,
    postAnecdote,
    upvoteAnecdote,
} from '../services/anecdotes'

const reducer = (state = [], action) => {
    const { type, data } = action
    switch (type) {
        case 'INITANECDOTES':
            return data.anecdotes
        case 'VOTE':
            return state.map((e) => (e.id === data.id ? data : e))
        case 'NEWANECDOTE':
            return [...state, data]
        default:
            return state
    }
}

export const initAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await getAnecdotes()
        dispatch({
            type: 'INITANECDOTES',
            data: { anecdotes },
        })
    }
}

export const saveNewAnecdote = (anecdote) => {
    return async (dispatch) => {
        const newAnecdote = await postAnecdote(anecdote)
        dispatch({
            type: 'NEWANECDOTE',
            data: newAnecdote,
        })
    }
}

export const vote = (anecdote) => {
    return async (dispatch) => {
        const updatedAnecdote = await upvoteAnecdote(anecdote)
        dispatch({
            type: 'VOTE',
            data: updatedAnecdote,
        })
    }
}

export default reducer
