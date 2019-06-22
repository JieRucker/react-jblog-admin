/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/6/15 下午2:53
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/6/15 下午2:53
 */

import api from '@/api/server';
import {message} from 'antd';

const TAG_LIST_SUCCESS = 'TAG_LIST_SUCCESS';
const SET_STORE_SUCCESS = 'SET_STORE_SUCCESS';
const ADD_ARTICLE_SUCCESS = 'ADD_ARTICLE_SUCCESS';

const initState = {
    title: '',
    tag_list: [],
    state: 1,
    state_list: [{
        name: '发布',
        value: 1
    }, {
        name: '草稿',
        value: 0
    }],
    cover: '',
    desc: '',
    create_time: '',
    update_time: '',
    content: '',
    navigation: [],
    selectedTags: [],
};

export function article_new(state = initState, action) {
    switch (action.type) {
        case TAG_LIST_SUCCESS:
            return {
                ...state,
                tag_list: action.payload.tag_list
            };
        case SET_STORE_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        case ADD_ARTICLE_SUCCESS:
            return {};
        default:
            return state
    }
}

export function getTagsList() {
    return async dispatch => {
        let res = await api.tagsInterface.getTagsList();
        let {article_num_list = [], tags_list = []} = res.data.data;
        tags_list.forEach(item => {
            item.checked = false;
            let temp = article_num_list.find(i => {
                return i._id === item._id;
            });
            item.tags_article_num = temp == null ? 0 : temp.count;
        });

        let tag_list = tags_list.sort((a, b) => a.tags_article_num < b.tags_article_num);

        dispatch({
            type: TAG_LIST_SUCCESS,
            payload: {tag_list}
        })
    }
}

export function addArticle({content, render_content, cover, desc, state, tags, title, navigation}) {
    return async dispatch => {
        let reqBody = {
            article_content: content,
            article_render_content: render_content,
            article_cover: cover,
            article_desc: desc,
            article_state: state,
            article_tags: tags,
            article_title: title,
            article_navigation: navigation
        };

        console.log(reqBody);

        let res = await api.articleInterface.addArticle(reqBody);
        let {msg} = res.data;
        return message.info(msg)
    }
}

/**
 * 设置属性值
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function setStore(payload) {
    return {
        type: SET_STORE_SUCCESS,
        payload
    }
}