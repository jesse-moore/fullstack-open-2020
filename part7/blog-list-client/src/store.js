import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import messageReducer from './reducers/messageReducer'
import commentReducer from './reducers/commentReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  user: userReducer,
  message: messageReducer,
  comments: commentReducer,
})

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
