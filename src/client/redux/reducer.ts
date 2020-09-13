import Cookies from 'js-cookie';
import { Action, LOGIN, LOGOUT, SET_ACCOUNTS, SET_GROUPS, SET_PERMISSIONS } from './actions';
import { State } from './state';
import { List } from 'immutable';
import { Permission, Account, Group } from '../../common/permission/types';

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

    case SET_ACCOUNTS: {
      return state.setIn(['admin', 'accounts'], List<Account>(action.accounts));
    } break;

    case SET_GROUPS: {
      return state.setIn(['admin', 'groups'], List<Group>(action.groups));
    } break;

    case SET_PERMISSIONS: {
      return state.setIn(['admin', 'permissions'], List<Permission>(action.permissions));
    } break;

    default: {
      return state;
    } break;
  }
}
