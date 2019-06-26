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
    UPLOAD_LIST_SUCCESS: 'upload/UPLOAD_LIST_SUCCESS',
    SET_STORE_SUCCESS: 'upload/SET_STORE_SUCCESS'
};

const initState = {};

export function upload(state = initState, action) {
    switch (action.type) {
        case types.TAG_LIST_SUCCESS:
            return {
                ...state,
                tag_list: action.payload.tag_list
            };
        case types.WORKS_LIST_SUCCESS:
            return {
                ...state,
                works_list: action.payload.list,
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
