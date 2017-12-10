import * as types from './actionTypes';

export const authenticate = () => {
    return {
        type: types.AUTHENTICATED_SUCCESS,
    }
};

export const failedLogin = () => {
    return {
        type: types.FAILED_LOGIN,
    }
};

export const justRegistered = () => {
    return {
        type: types.JUST_REGISTERED
    }
};

export const justRegisteredUndo = () => {
    return {
        type: types.JUST_REGISTERED_UNDO
    }
};

export const toggleLoadingBar = (showLoadingBar) => {
    return {
        type: types.TOGGLE_LOADING_BAR,
        showLoading: showLoadingBar
    }
};