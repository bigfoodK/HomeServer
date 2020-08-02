import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store, { dispatch } from './redux/store';
import Actions from './redux/actions';

const token = localStorage.getItem('Authentication-Token');
const id = localStorage.getItem('id');
const nickname = localStorage.getItem('nickname');

if (token && id && nickname) {
  dispatch(Actions.login(token, id, nickname));
}


ReactDOM.render(<Provider store={ store }><App /></Provider>, document.getElementById('root'));
