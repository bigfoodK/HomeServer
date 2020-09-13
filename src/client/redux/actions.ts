import { Permission, Account, Group } from '../../common/permission/types';

export const LOGIN = 'LOGIN' as const;
export const LOGOUT = 'LOGOUT' as const;
export const SET_ACCOUNTS = 'SET_ACCOUNTS' as const;
export const SET_GROUPS = 'SET_GROUPS' as const;
export const SET_PERMISSIONS = 'SET_PERMISSIONS' as const;

namespace Actions {
  export const login = (token: string, id: string, nickname: string) => ({
    type: LOGIN,
    id,
    nickname,
    token,
  });

  export const logout = () => ({
    type: LOGOUT,
  });

  export const setAccounts = (accounts: Account[]) => ({
    type: SET_ACCOUNTS,
    accounts,
  });

  export const setGroups = (groups: Group[]) => ({
    type: SET_GROUPS,
    groups,
  });

  export const setPermissions = (permissions: Permission[]) => ({
    type: SET_PERMISSIONS,
    permissions,
  });
}

export default Actions;

const actions = [
  Actions.login,
  Actions.logout,
  Actions.setAccounts,
  Actions.setGroups,
  Actions.setPermissions,
] as const;

export type Action = ReturnType<typeof actions[number]>

