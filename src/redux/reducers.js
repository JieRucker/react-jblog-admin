import { combineReducers } from 'redux'
import { user } from './user.redux'
import { blog } from './blog.redux'
export default combineReducers({
  user,
  blog
})