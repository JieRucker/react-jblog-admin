/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/6/15 下午2:53
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/6/15 下午2:53
 */

import api from '@/api/server';
import {message} from "antd/lib/index";
// import {message} from 'antd';

const TAG_LIST_SUCCESS = 'TAG_LIST_SUCCESS';
const SET_STORE_SUCCESS = 'SET_STORE_SUCCESS';
const GET_ARTICLE_SUCCESS = 'GET_ARTICLE_SUCCESS';
const ALTER_ARTICLE_SUCCESS = 'ALTER_ARTICLE_SUCCESS';

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

export function article_edit(state = initState, action) {
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
        case GET_ARTICLE_SUCCESS:
            let payload = action.payload;
            let selectedTags = [];

            if (payload.article_tags.length) {
                payload.article_tags.map(item => selectedTags.push(item._id))
            }

            return {
                ...state,
                title: payload.article_title,
                state: payload.article_state,
                cover: payload.article_cover,
                desc: payload.article_desc,
                create_time: payload.create_time,
                update_time: payload.update_time,
                content: payload.article_content,
                selectedTags: selectedTags
            };
        case ALTER_ARTICLE_SUCCESS:
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

export function getArticle({_id}) {
    return async dispatch => {
        let res = await api.articleInterface.getArticleById({_id});
        let {code, data} = res.data;

        if (code === 200 && data.length) {
            let [payload] = data;

            dispatch({
                type: GET_ARTICLE_SUCCESS,
                payload
            })
        }
    }
}

export function alterArticle({_id, content, render_content, cover, desc, state, tags, title, navigation}) {
    return async dispatch => {
        let reqBody = {
            _id,
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

        let res = await api.articleInterface.alterArticle(reqBody);
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