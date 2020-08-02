import Cookies from 'js-cookie';
import { Action, LOGIN, LOGOUT } from './actions';
import { State } from './state';

export default function reducer(state: State = new State(), action: Action) {
  switch (action.type) {
    case LOGIN: {
      localStorage.setItem('Authentication-Token', action.token);
      localStorage.setItem('id', action.id);
      localStorage.setItem('nickname', action.nickname);
      Cookies.set('Authentication-Token', action.token);
      return state.update('account', account => account.set('loggedIn', true)
        .set('nickname', action.nickname)
        .set('id', action.id)
      );
    } break;

    case LOGOUT: {
      Cookies.remove('Authentication-Token');
      localStorage.removeItem('Authentication-Token');
      localStorage.removeItem('id');
      localStorage.removeItem('nickname');
      return state.update('account', account => account.set('loggedIn', false)
        .set('nickname', '')
        .set('id', '')
      );
    } break;

    default: {
      return state;
    } break;
  }
}
