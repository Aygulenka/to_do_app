import { combineReducers } from "redux";
import registerReducer from "./registerSlice";
import authReducer from "./authSlice";
import outReducer from "./outSlice";
import toDoReducer from "./todoSlice";

const rootReducer = combineReducers({
  register: registerReducer,
  auth: authReducer,
  out: outReducer,
  tasks: toDoReducer,
});

export default rootReducer;
