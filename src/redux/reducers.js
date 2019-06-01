import {combineReducers} from 'redux'
import {user} from './user.redux'
import {blog} from './blog.redux'
import {blog1} from './blog1.redux';

export default combineReducers({
    user,
    blog,
    blog1
})
