import { toggleLoadingBar } from '../actions/uiActions';

const wrapper = (actionCreator) => {
    return (dispatch) => {
        dispatch(toggleLoadingBar(true));
        setTimeout(() => {
            actionCreator(dispatch);
            dispatch(toggleLoadingBar(false));
        }, 300);
    }
};

export default wrapper;