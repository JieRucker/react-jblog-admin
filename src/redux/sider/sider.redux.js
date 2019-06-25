/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/6/1 16:34
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/6/1 16:34
 */

export const types = {
    OPEN_CHANGE_SUCCESS: 'OPEN_CHANGE_SUCCESS',
    INIT_JSON_SUCCESS: 'INIT_JSON_SUCCESS'
};

const initState = {
    openKeys: [] // 展开的菜单
};

export function sider(state = initState, action) {
    switch (action.type) {
        case types.OPEN_CHANGE_SUCCESS:
            window.sessionStorage.setItem('openMenuKeys', JSON.stringify(action.payload));

            return Object.assign({}, state, {
                openKeys: action.payload
            });
        case types.INIT_JSON_SUCCESS:
            return Object.assign({}, state, {
                openKeys: action.payload
            });
        default:
            return state
    }
}

export function initOpenMenu() {
    return dispatch => {
        let openMenuKeys = window.sessionStorage.getItem('openMenuKeys');

        if (openMenuKeys) {
            let json = JSON.parse(openMenuKeys);

            dispatch({
                type: types.INIT_JSON_SUCCESS,
                payload: json
            })
        }
    }
}

export function siderOpenChange(openKeys) {
    return dispatch => {
        dispatch({
            type: types.OPEN_CHANGE_SUCCESS,
            payload: openKeys
        });
    }
}
