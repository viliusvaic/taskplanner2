import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import boardsReducer from './boardsReducer';
import tasksReducer from './tasksReducer';
import uiReducer from './uiReducer';

const rootReducer = combineReducers({
    boardsReducer,
    tasksReducer,
    uiReducer,
    form: formReducer,
    routing
});

export default rootReducer;