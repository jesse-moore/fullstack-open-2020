const reducer = (state = '', action) => {
    const { type, data } = action
    switch (type) {
        case 'SETNOTIFICATION':
            return data.message
        case 'REMOVENOTIFICATION':
            return ''
        default:
            return state
    }
}

export const setNotification = (message, timeout = 5000) => {
    return async (dispatch) => {
        setTimeout(() => {
            dispatch({
                type: 'SETNOTIFICATION',
                data: { message: '' },
            })
        }, timeout)
        dispatch({
            type: 'SETNOTIFICATION',
            data: { message },
        })
    }
}

export const removeNotification = (message) => {
    return {
        type: 'REMOVENOTIFICATION',
    }
}

export default reducer
