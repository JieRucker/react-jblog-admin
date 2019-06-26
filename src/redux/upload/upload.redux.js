/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/6/26 14:23
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/6/26 14:23
 */

import api from '@/api/server';
import {message} from 'antd';

export const types = {
    GET_FOLD_SUCCESS: 'upload/GET_FOLD_SUCCESS',
    UPLOAD_LIST_SUCCESS: 'upload/UPLOAD_LIST_SUCCESS',
    SET_STORE_SUCCESS: 'upload/SET_STORE_SUCCESS'
};

const initState = {
    tree_list: [],
    upload_list: [],
    total_count: 0,
    current_page: 1,
    page_size: 10,
};

export function upload(state = initState, action) {
    switch (action.type) {
        case types.TAG_LIST_SUCCESS:
            return {
                ...state,
                tag_list: action.payload.tag_list
            };
        case types.GET_FOLD_SUCCESS:
            return {
                ...state,
                tree_list: action.payload.tree_list
            };
        case types.UPLOAD_LIST_SUCCESS:
            return {
                ...state,
                upload_list: action.payload.list,
                total_count: action.payload.total
            };
        case types.SET_STORE_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state
    }
}

export function getFold() {
    return async dispatch => {
        let res = await api.uploadInterface.getFold();
        let {code, msg, data} = res.data;

        let tree_list = [];

        if (code === 200) {

            data.map(item => {
                return tree_list.push({
                    parentId: item.parentId,
                    id: item._id,
                    _id: item._id,
                    name: item.name,
                    isFolder: true,
                    showDropDown: item.hasOwnProperty('children'),
                    openFolder: false,
                    selected: false,
                    isEdit: false,
                    originNodes: item.children ? item.children : [],
                    nodes: []
                })
            });

            dispatch({
                type: types.GET_FOLD_SUCCESS,
                payload: tree_list
            })
        }
    }
}

export function getUploadList({id, current_page, page_size}) {
    return async dispatch => {
        let reqBody = {
            id,
            current_page,
            page_size,
        };

        let res = await api.uploadInterface.getUploadList(reqBody);
        let {code, data = {}} = res.data;
        if (code === 200) {
            dispatch({
                type: types.UPLOAD_LIST_SUCCESS,
                payload: data
            })
        }
    }
}

export function alterUpload({fold_id, _id, onSuccess}) {
    return async dispatch => {
        let res = await api.uploadInterface.alterUpload({fold_id, _id});
        let {code, msg} = res.data;
        if (code === 200) {
            onSuccess()
        }

        return message.info(msg)
    }
}

export function deleteUpload({_id, onSuccess}) {
    return async dispatch => {
        let res = await api.uploadInterface.deleteUploadById({_id});
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
 * @returns {Function}
 */
export function setStore(payload) {
    return dispatch => {
        dispatch({
            type: types.SET_STORE_SUCCESS,
            payload
        })
    }
}
