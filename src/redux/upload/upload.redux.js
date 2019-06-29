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
                tree_list: action.payload
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
        let {code, data} = res.data;

        if (code === 200) {

            function deep(node) {
                node.map(item => {
                    item.value = item.name;
                    item.defaultValue = item.name;
                    item.key = item._id;
                    item.isEditable = false;
                    item.children && deep(item.children);

                    return true
                });
            }

            deep(data);

            dispatch({
                type: types.GET_FOLD_SUCCESS,
                payload: data
            })
        }
    }
}

export function addFold({parentId, name, onSuccess}) {
    return async dispatch => {
        let reqBody = {
            parentId,
            name
        };

        let res = await api.uploadInterface.addFold(reqBody);
        let {code, msg} = res.data;

        if (code === 200) {
            onSuccess();
            message.info(msg)
        }
    }
}

export function alterFold({_id, name, onSuccess}) {
    return async dispatch => {
        let reqBody = {
            _id,
            name
        };

        let res = await api.uploadInterface.alterFold(reqBody);
        let {code, msg} = res.data;

        if (code === 200) {
            onSuccess();
            message.info(msg)
        }
    }
}

export function deleteFold({_id, onSuccess}) {
    return async dispatch => {
        let reqBody = {
            _id,
        };

        let res = await api.uploadInterface.deleteFold(reqBody);
        let {code, msg} = res.data;

        if (code === 200) {
            onSuccess();
            message.info(msg)
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
