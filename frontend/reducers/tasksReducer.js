import * as types from '../actions/actionTypes';

const initialState = {
    tasks: [],
    selectedTask: null
};

const tasksReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.LOAD_TASKS_SUCCESS:
            state = { ...state };
            state.tasks = action.tasks;
            return state;
        case types.LOAD_TASK_SUCCESS:
            state = { ...state };
            state.selectedTask = action.task;
            return state;
        default:
            return state;
    }
};

export default tasksReducer;