/* eslint-disable indent */
let messageTimeout

const reducer = (state = {}, action) => {
  const { type, data } = action
  switch (type) {
    case 'ERROR':
      return { ...data, type: 'alert' }
    case 'NOTIF':
      return { ...data, type: 'notif' }
    case 'CLEARMESSAGE':
      return {}
    default:
      return state
  }
}

export const alertMessage = ({ message }) => {
  return (dispatch) => {
    if (messageTimeout) clearTimeout(messageTimeout)
    if (message) {
      messageTimeout = setTimeout(() => {
        dispatch(clearMessage())
      }, 5000)
      dispatch({
        type: 'ERROR',
        data: { message },
      })
    }
  }
}

export const notifMessage = ({ message }) => {
  return (dispatch) => {
    if (messageTimeout) clearTimeout(messageTimeout)
    if (message) {
      messageTimeout = setTimeout(() => {
        dispatch(clearMessage())
      }, 5000)
      dispatch({
        type: 'NOTIF',
        data: { message },
      })
    }
  }
}

export const clearMessage = () => {
  return (dispatch) => {
    dispatch({
      type: 'CLEARMESSAGE',
    })
  }
}

export default reducer
