import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import messageReducer from './reducers/messageReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  user: userReducer,
  message: messageReducer,
})

export default createStore(reducer, applyMiddleware(thunk))
