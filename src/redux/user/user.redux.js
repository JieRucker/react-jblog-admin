/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/5/19 上午12:03
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/5/19 上午12:03
 */

import {message} from 'antd'

import JSEncrypt from 'jsencrypt';
import api from '@/api/server';
import Cookies from 'js-cookie'

/**
 * action
 */
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const LOGOUT = 'LOGOUT';

const FETCH_CAPTCHA = 'FETCH_CAPTCHA';

/**
 * state
 */
const initState = {
    redirectTo: '', // 重定向
    checkToken: '', // token值
    captchaImg: '', // 验证码
    admin_id: '',
    admin_name: '', // 用户名
    token: ''
};

/**
 * reducer
 * @param {*} state
 * @param {*} action
 */
export function user(state = initState, action) {
    switch (action.type) {
        case FETCH_CAPTCHA:
            return {
                checkToken: action.payload.token,
                captchaImg: action.payload.img,
            };
        case LOGIN_SUCCESS:
            let {admin_id, admin_name, token} = action.payload;
            Cookies.set('admin_id', admin_id);
            Cookies.set('admin_name', admin_name);
            Cookies.set('token', token);

            return {
                ...state,
                redirectTo: '/app/article/list',
                admin_id: admin_id,
                admin_name: admin_name,
                token: token
            };
        case REGISTER_SUCCESS:
            return {
                redirectTo: '/login',
            };
        case LOGOUT:
            Cookies.remove('admin_id');
            Cookies.remove('admin_name');
            Cookies.remove('token');

            return {
                admin_id: '',
                admin_name: '',
                token: '',
                redirectTo: '/login'
            };
        default:
            return state
    }
}

/**
 * dispatch
 */

export function fetchCaptcha() {
    return async dispatch => {
        let res = await api.loginInterface.getCheckcode();
        let {code, data} = res.data;
        if (code === 200) {
            dispatch({
                type: FETCH_CAPTCHA,
                payload: data
            });
        }
    }
}

function getCheckcode() {
    return new Promise(async (resolve, reject) => {
        let res = await api.loginInterface.getCheckcode();
        let {code, data} = res.data;
        if (code === 200) {
            resolve(data)
        }
    });
}

export function login({username, password, captcha, checkToken}) {
    return async dispatch => {
        let res = await api.loginInterface.getPublicKey();
        let {code, data} = res.data;
        if (code === 200) {
            let publicKey = data;
            let encrypt = new JSEncrypt.JSEncrypt();
            encrypt.setPublicKey(publicKey);

            let params = {
                admin_id: username,
                admin_pwd: encrypt.encrypt(password),
                code: captcha,
                token: checkToken
            };

            let res_login = await api.loginInterface.login(params);

            let {code, msg} = res_login.data;
            if (code === 200) {
                message.success('登录成功！');

                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res_login.data.data
                });

                return false;
            }

            message.error(msg);

            let getCode = await getCheckcode();

            dispatch({
                type: FETCH_CAPTCHA,
                payload: Object.assign({}, getCode)
            });
        }
    }
}

export function register({username, password}) {
    return async dispatch => {
        let params = {
            admin_name: username,
            admin_id: username,
            admin_pwd: password,
        };

        let res = await api.loginInterface.register(params);

        let {code, msg} = res.data;
        if (code === 200) {
            message.success('注册成功！');

            dispatch({
                type: REGISTER_SUCCESS,
            });

            return false;
        }

        message.error(msg);
    }
}

export function loginOut() {
    return {
        type: LOGOUT
    }
}
