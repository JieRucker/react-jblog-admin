// import axios from 'axios'
// import qs from 'qs'
import {
  message
} from 'antd'

import JSEncrypt from 'jsencrypt';
import api from '@/api/server';

/**
 * action
 */
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGOUT = 'LOGOUT';

const FETCH_CAPTCHA = 'FETCH_CAPTCHA';
/**
 * state
 */
const initState = {
  user: '',
  msg: '',
  redirectTo: '',

  checkToken: '',
  captchaImg: '',
  admin_id: '',
  admin_name: '',
  token: ''
}

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
        captchaImg: action.payload.img
      };
    case LOGIN_SUCCESS:
      /*return {
        ...state,
        redirectTo: '/app/index',
        user: action.payload.data,
        msg: action.payload.msg
      };*/
      return {
        ...state,
        redirectTo: '/app/index',
        admin_id: action.payload.admin_id,
        admin_name: action.payload.admin_name,
        token: action.payload.token
      };
    case LOGOUT:
      return {
        user: '',
        msg: '',
        redirectTo: ''
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        user: '',
        token: '',
        msg: action.msg
      };
    default:
      return state
  }
}

/**
 * action type
 */
/*function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  }
}*/

/*function loginFailure(msg) {
  return {
    msg,
    type: LOGIN_FAILURE
  }
}*/

async function onPublicKey(dispatch, params) {
  console.log(params);

  let res = await api.loginInterface.login(params);

  let {code, data, msg} = res.data;
  if (code === 200) {
    message.success('登录成功！');

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data
    });

    return false;
  }

  fetchCaptcha()();
  // this.form.vericode = '';
  // this.getCode();
  message.error(msg)
}

/**
 * dispatch
 */

export function fetchCaptcha() {
  return async dispatch =>{
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

      onPublicKey(dispatch, params);

    }


    /*axios.post('/api/users/login', qs.stringify({
      username,
      password
    }), {
      withCredentials: true
    }).then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(loginSuccess(res.data))
          message.success(res.data.msg)
        } else {
          dispatch(loginFailure(res.data.msg))
          message.error(res.data.msg)
        }
      })*/
  }
}

export function logoutSubmit() {
  return {
    type: LOGOUT
  }
}