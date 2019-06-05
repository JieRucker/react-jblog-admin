import {combineReducers} from 'redux'
import {user} from './user/user.redux'
import {blog} from './blog/blog.redux'
import {sider} from './sider/sider.redux';
import {article_list} from './article/list.redux';

export default combineReducers({
    user,
    blog,
    sider,
    article_list
})
