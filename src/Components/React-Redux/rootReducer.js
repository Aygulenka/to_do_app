import { combineReducers } from 'redux';
import { registerReducer, authReducer, logoutReducer, modalReducer } from './Reg-Login-Logout/reducer';
import tasksReducer from './Tasks/reducers';

const rootReducer = combineReducers({
    register: registerReducer,
    auth: authReducer,
    logout: logoutReducer,
    modal: modalReducer,
    tasks: tasksReducer

});

export default rootReducer;