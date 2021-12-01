import {combineReducers, createStore} from 'redux';
import userReducer from './duck/user';
import activepage from './duck/activepage';

const reducer = combineReducers({
    userInfo: userReducer,
    activePage: activepage,
});

const store = createStore(reducer);

export default store;