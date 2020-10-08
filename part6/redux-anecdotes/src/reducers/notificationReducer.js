const reducer = (state = '', action) => {
    const { type, data } = action
    switch (type) {
        case 'SETNOTIFICATION':
            return data.message
        case 'REMOVENOTIFICATION':
            return ''
        case 'VOTE':
            return `you voted '${data.content}'`
        default:
            return state
    }
}

export const setNotification = (message) => {
    return {
        type: 'SETNOTIFICATION',
        data: { message },
    }
}

export const removeNotification = (message) => {
    return {
        type: 'REMOVENOTIFICATION',
    }
}

export default reducer
