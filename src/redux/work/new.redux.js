/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/6/15 下午2:53
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/6/15 下午2:53
 */

import api from '@/api/server';
// import {message} from 'antd';

export const types = {
    TAG_LIST_SUCCESS: 'work_new/TAG_LIST_SUCCESS',
    SET_STORE_SUCCESS: 'work_new/SET_STORE_SUCCESS',
    GET_ARTICLE_SUCCESS: 'work_new/GET_ARTICLE_SUCCESS',
    ADD_ARTICLE_SUCCESS: 'work_new/ADD_ARTICLE_SUCCESS',
    ALTER_ARTICLE_SUCCESS: 'work_new/ALTER_ARTICLE_SUCCESS'
};

const initState = {
    title: '',
    tag_list: [],
    state: 1,
    cover: '',
    desc: '',
    create_time: '',
    update_time: '',
    content: '234234\n' +
        '\n' +
        '### dfsdf\n' +
        '\n' +
        '> sdfsdf\n' +
        '\n' +
        '- sdfsdf\n' +
        '\n' +
        '```js\n' +
        'sdfsdfs\n' +
        '```',
    navigation: [],
    selectedTags: [],
};

export function article_new(state = initState, action) {
    switch (action.type) {
        case types.TAG_LIST_SUCCESS:
            return {
                ...state,
                tag_list: action.payload.tag_list
            };
        case types.SET_STORE_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        case types.GET_ARTICLE_SUCCESS:
            let payload = action.payload;
            let tag_list = [];

            if (payload.article_tags.length) {
                tag_list = state.tag_list.map(item => {
                    return payload.article_tags.map(m => (item._id === m._id) && (item.checked = true))
                })
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
                tag_list: tag_list
            };
        case types.ADD_ARTICLE_SUCCESS:
            return {};
        case types.ALTER_ARTICLE_SUCCESS:
            return {};
        default:
            return state
    }
}

export function getTagsList() {
    // let tag_list = [];

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

        console.log(tag_list)
        dispatch({
            type: types.TAG_LIST_SUCCESS,
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
                type: types.GET_ARTICLE_SUCCESS,
                payload
            })
        }
    }
}

export function addArticle({content, render_content, cover, desc, state, tags, title, navigation}) {
    return async dispatch => {
        let reqBody = {
            _id: '',
            article_content: content,
            article_render_content: render_content,
            article_cover: cover,
            article_desc: desc,
            article_state: state,
            article_tags: tags,
            article_title: title,
            article_navigation: navigation
        };

        console.log(reqBody)

        /* let res = await api.articleInterface.addArticle(reqBody);
         let {msg} = res.data;
         return message.info(msg)*/
    }
}

export function alterArticle() {
    return dispatch => {

    }
}

/**
 * 设置属性值
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function setStore(payload) {
    return {
        type: types.SET_STORE_SUCCESS,
        payload
    }
}
