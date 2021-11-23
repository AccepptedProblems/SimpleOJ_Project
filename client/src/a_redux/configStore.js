import {combineReducers, createStore} from 'redux';
import user from './duck/user';
import activepage from './duck/activepage';

const reducer = combineReducers({
    userInfo: user,
    activePage: activepage,
});

const store = createStore(reducer);

export default store;