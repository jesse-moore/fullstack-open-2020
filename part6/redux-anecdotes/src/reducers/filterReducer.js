const reducer = (state = '', action) => {
    const { type, data } = action
    switch (type) {
        case 'SETFILTER':
            return data.filter
        default:
            return state
    }
}

export const setFilter = (filter) => {
    return {
        type: 'SETFILTER',
        data: { filter },
    }
}

export default reducer
