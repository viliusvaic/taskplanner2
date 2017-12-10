import * as types from '../actions/actionTypes';

const initialState = {
    isAuthenticated: localStorage.getItem('token') ? true : false,
    unsuccessfulLogin: false,
    successfulRegister: false,
    showLoading: false
};

const uiReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.AUTHENTICATED_SUCCESS:
            state = { ...state };
            state.isAuthenticated = true;
            return state;
        case types.FAILED_LOGIN:
            state = { ...state };
            state.unsuccessfulLogin = true;
            return state;
        case types.JUST_REGISTERED:
            state = { ...state };
            state.successfulRegister = true;
            return state;
        case types.JUST_REGISTERED_UNDO:
            state = { ...state };
            state.successfulRegister = false;
            return state;
        case types.TOGGLE_LOADING_BAR:
            state = { ...state };
            state.showLoading = action.showLoading;
            return state;
        default:
            return state;
    }
};

export default uiReducer;