import { RestAPIResponseMessage } from './types';
import { Permission, Group, Account } from '../permission/types';

export namespace AdminRestAPIResponseMessages {
  export type GetAccount = RestAPIResponseMessage<{
    account: Account;
  },
    'No such account exist'
  >

  export type GetAccounts = RestAPIResponseMessage<{
    accounts: Account[];
  }>

  export type GetAccountsInGroup = RestAPIResponseMessage<{
    accountInternalIds: string[];
  },
    'No such group exist'
  >

  export type GetGroup = RestAPIResponseMessage<{
    group: Group;
  },
    'No such group exist'
  >

  export type GetGroups = RestAPIResponseMessage<{
    groups: Group[];
  }>

  export type GetGroupsContainingAccount = RestAPIResponseMessage<{
    groupInternalIds: string[];
  },
    'No such account exist'
  >

  export type CreateGroup = RestAPIResponseMessage

  export type AddAccountToGroup = RestAPIResponseMessage

  export type RemoveAccountFromGroup = RestAPIResponseMessage

  export type GetPermission = RestAPIResponseMessage<{
    permission: Permission;
  },
    'No permission exist on path'
  >

  export type GetPermissions = RestAPIResponseMessage<{
    permissions: Permission[];
  }>

  export type AddPermissionRule = RestAPIResponseMessage

  export type RemovePermissionRule = RestAPIResponseMessage
}
