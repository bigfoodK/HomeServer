import { Identity } from '../permission/types'

export namespace AdminRestAPIRequestMessages {
  export type GetAccount = {
    accountInternalId: string;
  }

  export type GetAccounts = {}

  export type GetAccountsInGroup = {
    groupInternalId: string;
  }

  export type GetGroup = {
    groupInternalId: string;
  }

  export type GetGroups = {}

  export type GetGroupsContainingAccount = {
    accountInternalId: string;
  }

  export type CreateGroup = {
    name: string;
  }

  export type AddAccountToGroup = {
    accountInternalId: string;
    groupInternalId: string;
  }

  export type RemoveAccountFromGroup = {
    accountInternalId: string;
    groupInternalId: string;
  }

  export type GetPermission = {
    path: string;
  }

  export type GetPermissions = {}

  export type AddPermissionRule = {
    path: string;
    allowAnonymous: boolean;
    allowedIdentities: Identity[];
    deniedIdentities: Identity[];
  }

  export type RemovePermissionRule = {
    path: string;
    permissionRuleInternalId: string;
  }
}
