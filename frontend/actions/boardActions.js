import { getBoardsRequest, deleteBoardRequest, createBoardRequest, getBoardRequest, updateBoardRequest } from '../api/boardsApi';
import apiWrapper from './apiActionsWrapper'
import * as types from './actionTypes';

export const getBoards = () => {
    return apiWrapper((dispatch) => {
        return getBoardsRequest().then((boards) => {
            dispatch(getBoardsSuccess(boards));
        });
    });
};

export const getBoard = (boardId) => {
    return apiWrapper(async (dispatch) => {
        const board = await getBoardRequest(boardId);
        dispatch(getBoardSuccess(board));
    });
};

export const createBoard = (board) => {
    return apiWrapper(async (dispatch) => {
        await createBoardRequest(board);
        const boards = await getBoardsRequest();
        dispatch(getBoardsSuccess(boards));
    });
};

export const updateBoard = (board) => {
    return apiWrapper(async (dispatch) => {
        await updateBoardRequest(board);
        const boards = await getBoardsRequest();
        dispatch(getBoardsSuccess(boards));
    });
};

export const deleteBoard = (boardId) => {
    return apiWrapper(async (dispatch) => {
        await deleteBoardRequest(boardId);
        const boards = await getBoardsRequest();
        dispatch(getBoardsSuccess(boards));
    });
};

export const getBoardsSuccess = (boards) => {
    return {
        type: types.LOAD_BOARDS_SUCCESS,
        boards
    }
};

export const getBoardSuccess = (board) => {
    return {
        type: types.LOAD_BOARD_SUCCESS,
        board
    }
};