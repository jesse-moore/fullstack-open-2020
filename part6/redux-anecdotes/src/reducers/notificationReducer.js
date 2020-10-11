let clearNotif

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
        if (clearNotif) clearTimeout(clearNotif)
        clearNotif = setTimeout(() => {
            dispatch({
                type: 'REMOVENOTIFICATION',
            })
        }, timeout)
        dispatch({
            type: 'SETNOTIFICATION',
            data: { message },
        })
    }
}

export const removeNotification = () => {
    return {
        type: 'REMOVENOTIFICATION',
    }
}

export default reducer
