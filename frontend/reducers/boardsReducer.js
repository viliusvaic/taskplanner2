import * as types from '../actions/actionTypes';

const initialState = {
    boards: [],
    selectedBoard: null
};

const boardsReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.LOAD_BOARDS_SUCCESS:
            state = { ...state };
            state.boards = action.boards;
            return state;
        case types.LOAD_BOARD_SUCCESS:
            state = { ...state };
            state.selectedBoard = action.board;
            return state;
        default:
            return state;
    }
};

export default boardsReducer;