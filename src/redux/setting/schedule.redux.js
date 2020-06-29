/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/6/25 16:30
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/6/25 16:30
 */

import api from '@/api/server';
import {message} from 'antd';

export const types = {
    GET_SCHEDULE_SUCCESS: 'mine/GET_SCHEDULE_SUCCESS',
    ALTER_SCHEDULE_SUCCESS: 'mine/ALTER_SCHEDULE_SUCCESS',
    SET_STORE_SUCCESS: 'mine/SET_STORE_SUCCESS'
};

const initState = {
    juejin: '',
    tabs_list: [
        {
            name: '定时任务',
            key: 0
        },
        {
            name: '定时任务1',
            key: 1
        }
    ],
    schedule_list: [{
        task_name: '001',
        task_cookie: 'xxx',
        task_desc: '001',
        _id: 0
    }],
    weekSelectValue: 'day',
    dateSelectValue: '',
    timeValue: '',
    dateList: []
};

export function schedule(state = initState, action) {
    switch (action.type) {
        case types.GET_SETTING_SUCCESS:
            return {
                ...state,
                juejin: action.payload.juejin,
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

/**
 * 获取定时信息
 * @returns {Function}
 */
export function getSchedule() {
    return async dispatch => {
        let res = await api.scheduleInterface.getSchedule();
        if (!res) return;
        let {data = {}} = res.data;
        let info = data.info;
        let person_info = info.person_info;

        dispatch({
            type: types.GET_SETTING_SUCCESS,
            payload: {
                juejin: person_info ? person_info.juejin : ''
            }
        })
    }
}

/**
 * 修改定时信息
 * @param avatar
 * @param cover
 * @param description
 * @param github
 * @param juejin
 * @returns {function(*): MessageType}
 */
export function alterSchedule({avatar, cover, description, github, juejin}) {
    return async dispatch => {
        let reqBody = {
            person_info: JSON.stringify({
                avatar,
                cover,
                description,
                github,
                juejin,
            })
        };

        let res = await api.scheduleInterface.alterSchedule(reqBody);
        if (!res) return;
        let {msg} = res.data;
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
