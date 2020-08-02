import * as redux from 'redux';
import reducer from './reducer';

const store = redux.createStore(reducer);

export const dispatch =  store.dispatch;

export default store;
