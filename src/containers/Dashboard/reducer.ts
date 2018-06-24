import { combineReducers } from "redux";
import { createReducer } from "../../utilities/redux-helpers";
import { setFalse, setTrue, setPayload } from "../../utilities/utility";

const isLoadingReducer = createReducer(false, {});

// GLOBAL STATE
// *************************************************************
export const GLOBAL_STATE_REDUCER: any = combineReducers({
  isLoading: isLoadingReducer
});
