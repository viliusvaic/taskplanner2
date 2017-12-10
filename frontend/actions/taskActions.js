import { getTasksRequest, updateTaskRequest, deleteTaskRequest, createTaskRequest, getTaskRequest } from '../api/tasksApi';
import { toggleLoadingBar } from '../actions/uiActions';
import apiWrapper from './apiActionsWrapper'
import * as types from './actionTypes';

export const createTask = (boardId, task) => {
    return apiWrapper(async (dispatch) => {
        await createTaskRequest(boardId, {
            ...task,
            status: 1
        });
        const tasks = await getTasksRequest(boardId);
        dispatch(getTasksSuccess(tasks));
    });
};

export const getTasks = (boardId) => {
    return apiWrapper(async (dispatch) => {
        dispatch(toggleLoadingBar(true));
        const tasks = await getTasksRequest(boardId);
        dispatch(getTasksSuccess(tasks));
        dispatch(toggleLoadingBar(false));
    });
};

export const getTask = (boardId, taskId) => {
    return apiWrapper(async (dispatch) => {
        const task = await getTaskRequest(boardId, taskId);
        dispatch(getTaskSuccess(task));
    });
};

export const updateTask = (boardId, task) => {
    return apiWrapper(async (dispatch) => {
        await updateTaskRequest(boardId, task);
        const tasks = await getTasksRequest(boardId);
        dispatch(getTasksSuccess(tasks));
    });
};

export const deleteTask = (boardId, taskId) => {
    return apiWrapper(async (dispatch) => {
        await deleteTaskRequest(boardId, taskId);
        const tasks = await getTasksRequest(boardId);
        dispatch(getTasksSuccess(tasks));
    });
};

export const getTasksSuccess = (tasks) => {
    return {
        type: types.LOAD_TASKS_SUCCESS,
        tasks
    }
};

export const getTaskSuccess = (task) => {
    return {
        type: types.LOAD_TASK_SUCCESS,
        task
    }
};