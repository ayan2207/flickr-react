import { combineReducers } from "redux";
import { createReducer } from "../../utilities/redux-helpers";
import { setFalse, setTrue, setPayload } from "../../utilities/utility";

const isLoadingReducer = createReducer(false, {
  flickr_GET_FEED_START: setTrue,
  flickr_GET_FEED_DONE: setFalse
});

const feedReducer = createReducer(null, {
  flickr_GET_FEED_DONE: setPayload
});

// GLOBAL STATE
// *************************************************************
export const GLOBAL_STATE_REDUCER: any = combineReducers({
  isLoading: isLoadingReducer,
  feed: feedReducer
});
