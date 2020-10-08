const reducer = (state = [], action) => {
    const { type, data } = action
    switch (type) {
        case 'INITANECDOTES':
            return data.anecdotes
        case 'VOTE':
            return state.map((e) =>
                e.id === data.id ? { ...e, votes: e.votes + 1 } : e
            )
        case 'NEWANECDOTE':
            return [...state, data]
        default:
            return state
    }
}

export const initAnecdotes = (anecdotes) => {
    return {
        type: 'INITANECDOTES',
        data: { anecdotes },
    }
}

export const saveNewAnecdote = (anecdote) => {
    return {
        type: 'NEWANECDOTE',
        data: anecdote,
    }
}

export const vote = ({ id, content }) => {
    return {
        type: 'VOTE',
        data: { id, content },
    }
}

export default reducer
