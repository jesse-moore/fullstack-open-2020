/* eslint-disable indent */
import { loginService } from '../services'

import { alertMessage } from './messageReducer'

const reducer = (state = {}, action) => {
  const { type, data } = action
  switch (type) {
    case 'LOGIN':
      return data.user
    case 'CHECKUSER':
      return data.user
    case 'LOGOUT':
      return data.user
    default:
      return state
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.handleLogin(username, password)
    if (user.error) {
      dispatch(alertMessage({ message: user.error }))
    } else {
      dispatch({
        type: 'LOGIN',
        data: { user },
      })
    }
  }
}

export const checkUser = () => {
  return async (dispatch) => {
    const user = await loginService.isLoggedIn()
    dispatch({
      type: 'CHECKUSER',
      data: { user },
    })
  }
}

export const logout = () => {
  return (dispatch) => {
    loginService.handleLogout()
    dispatch({
      type: 'LOGOUT',
      data: { user: { isLoggedIn: false } },
    })
  }
}

export default reducer
