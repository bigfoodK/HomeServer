import sendRestAPIMessage from '../sendRestAPIMessage';
import { AdminRestAPIRequestMessages } from '../../../common/restAPI/adminRestAPIRequestMessage';
import { AdminRestAPIResponseMessages } from '../../../common/restAPI/adminRestAPIResponseMessage';

export async function getAccount(accountInternalId: string) {
  return await sendRestAPIMessage<AdminRestAPIRequestMessages.GetAccount, AdminRestAPIResponseMessages.GetAccount>('/restAPI/admin/getAccount', {
    accountInternalId,
  });
}

export async function getAccounts() {
  return await sendRestAPIMessage<AdminRestAPIRequestMessages.GetAccounts, AdminRestAPIResponseMessages.GetAccounts>('/restAPI/admin/getAccounts', {});
}

export async function getAccountsInGroup(groupInternalId: string) {
  return await sendRestAPIMessage<AdminRestAPIRequestMessages.GetAccountsInGroup, AdminRestAPIResponseMessages.GetAccountsInGroup>('/restAPI/admin/getAccountsInGroup', {
    groupInternalId,
  });
}

export async function getGroup(groupInternalId: string) {
  return await sendRestAPIMessage<AdminRestAPIRequestMessages.GetGroup, AdminRestAPIResponseMessages.GetGroup>('/restAPI/admin/getGroup', {
    groupInternalId,
  });
}

export async function getGroups() {
  return await sendRestAPIMessage<AdminRestAPIRequestMessages.GetGroups, AdminRestAPIResponseMessages.GetGroups>('/restAPI/admin/getGroups', {});
}

export async function getGroupsContainingAccount(accountInternalId: string) {
  return await sendRestAPIMessage<AdminRestAPIRequestMessages.GetGroupsContainingAccount, AdminRestAPIResponseMessages.GetGroupsContainingAccount>('/restAPI/admin/getGroupsContainingAccount', {
    accountInternalId,
  });
}

export async function createGroup(name: string) {
  return await sendRestAPIMessage<AdminRestAPIRequestMessages.CreateGroup, AdminRestAPIResponseMessages.CreateGroup>('/restAPI/admin/createGroup', {
    name,
  });
}

export async function addAccountToGroup(accountInternalId: string, groupInternalId: string) {
  return await sendRestAPIMessage<AdminRestAPIRequestMessages.AddAccountToGroup, AdminRestAPIResponseMessages.AddAccountToGroup>('/restAPI/admin/addAccountToGroup', {
    accountInternalId,
    groupInternalId,
  });
}

export async function removeAccountFromGroup(accountInternalId: string, groupInternalId: string) {
  return await sendRestAPIMessage<AdminRestAPIRequestMessages.RemoveAccountFromGroup, AdminRestAPIResponseMessages.RemoveAccountFromGroup>('/restAPI/admin/removeAccountFromGroup', {
    accountInternalId,
    groupInternalId,
  });
}
