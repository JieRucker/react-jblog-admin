/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/6/4 15:57
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/6/4 15:57
 */

import api from '@/api/server';

const TAG_LIST_SUCCESS = 'TAG_LIST_SUCCESS';
const ARTICLE_LIST_SUCCESS = 'ARTICLE_LIST_SUCCESS';
const SET_STORE_SUCCESS = 'SET_STORE_SUCCESS';

const initState = {
    tag_list: [],
    keyword: '',
    tag: '',
    state: 1,
    total_count: 0,
    current_page: 1,
    page_size: 10,
    loading: false,
    article_list: []
};

export function article_list(state = initState, action) {
    switch (action.type) {
        case TAG_LIST_SUCCESS:
            return {
                ...state,
                tag_list: action.payload.tag_list
            };
        case ARTICLE_LIST_SUCCESS:
            return {
                ...state,
                article_list: action.payload.list,
                total_count: action.payload.total
            };
        case SET_STORE_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state
    }
}

export function getTagsList() {
    let tag_list = [];

    return async dispatch => {
        let res = await api.tagsInterface.getTagsList();
        let {article_num_list = [], tags_list = []} = res.data.data;

        tags_list.forEach(item => {
            let temp = article_num_list.find(i => i._id === item._id);
            item.tags_article_num = temp == null ? 0 : temp.count;
        });

        tag_list = tags_list.sort((a, b) => a.tags_article_num < b.tags_article_num);
        tag_list = tags_list;
        tag_list.unshift({
            tags_name: '所有',
            _id: ''
        });

        dispatch({
            type: TAG_LIST_SUCCESS,
            payload: {tag_list}
        })
    }
}

export function getArticleList({keyword, tag, state, current_page, page_size}) {
    return async dispatch => {
        let reqBody = {
            keyword,
            tag,
            state,
            current_page,
            page_size,
        };

        let res = await api.articleInterface.getArticleList(reqBody);
        let {code, data = {}} = res.data;
        if (code === 200) {
            dispatch({
                type: ARTICLE_LIST_SUCCESS,
                payload: data
            })
        }
    }
}

export function setStore(payload) {
    return {
        type: SET_STORE_SUCCESS,
        payload
    }
}
