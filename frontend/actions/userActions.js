import { getAccessToken, registerUserRequest } from '../api/userApi';
import { authenticate, failedLogin, justRegistered  } from './uiActions';

export const getToken = (userData) => {
    return async (dispatch) => {
        const token = await getAccessToken(userData);
        if (token) {
            localStorage.setItem('token', token);
            dispatch(authenticate());
        } else {
            dispatch(failedLogin());
        }
    }
};

export const registerUser = (userData) => {
    return async (dispatch) => {
        await registerUserRequest(userData);
        dispatch(justRegistered());
    }
};