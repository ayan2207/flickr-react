
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { loadState } from './utilities/local-storage';
import reducers from './root-reducer';

const composeWithDevTools = require('redux-devtools-extension').composeWithDevTools;

const presistedState = loadState();

const store = createStore(
    reducers,
    presistedState,
    composeWithDevTools(applyMiddleware(reduxThunk))
);

export default store;

// store.dispatch({type:'socket/login', data:'Hello!'});