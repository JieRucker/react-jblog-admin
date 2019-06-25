import {combineReducers} from 'redux'
import {user} from './user/user.redux'
import {blog} from './blog/blog.redux'
import {sider} from './sider/sider.redux';
import {article_list} from './article/list.redux';
import {article_new} from './article/new.redux';
import {article_edit} from './article/edit.redux';
import {tags_list} from './tag/list.redux';
import {mine} from './setting/mine.redux';
import {upyun} from './setting/upyun.redux';
import {about} from './setting/about.redux';
// import {work_list} from './work/list.redux';
// import {work_new} from './work/new.redux';

export default combineReducers({
    user,
    blog,
    sider,
    article_list,
    article_new,
    article_edit,
    tags_list,
    mine,
    upyun,
    about,
    // work_list,
    // work_new
})
