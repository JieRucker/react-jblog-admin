/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/6/24 16:19
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/6/24 16:19
 */

import api from '@/api/server';
import {message} from 'antd';

const TAG_LIST_SUCCESS = 'TAG_LIST_SUCCESS';
const SET_STORE_SUCCESS = 'SET_STORE_SUCCESS';

const initState = {
    tag_list: [],
    total_count: 0,
    current_page: 1,
    page_size: 10,
};

export function tags_list(state = initState, action) {
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
        default:
            return state
    }
}

/**
 * 获取标签列表
 * @returns {Function}
 */
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

        dispatch({
            type: TAG_LIST_SUCCESS,
            payload: {tag_list}
        })
    }
}

/**
 * 删除标签
 * @param _id
 * @param onSuccess
 * @returns {function(*): MessageType}
 */
export function deleteTags({_id, onSuccess}) {
    return async dispatch => {
        let res = await api.tagsInterface.deleteTagsById({_id});
        let {code, msg} = res.data;
        if (code === 200) {
            onSuccess()
        }

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
