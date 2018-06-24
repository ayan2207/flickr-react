import { combineReducers } from "redux";
import { GLOBAL_STATE_REDUCER } from "./containers/Dashboard/reducer";

const rootReducer = combineReducers({
  globalState: GLOBAL_STATE_REDUCER
});

export default rootReducer;
