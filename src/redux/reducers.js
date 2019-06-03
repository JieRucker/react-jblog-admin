import {combineReducers} from 'redux'
import {user} from './user.redux'
import {blog} from './blog.redux'
import {sider} from './sider.redux';

export default combineReducers({
    user,
    blog,
    sider
})
