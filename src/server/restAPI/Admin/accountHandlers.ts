import { AdminRestAPIRequestMessages } from '../../../common/restAPI/adminRestAPIRequestMessage';
import { AdminRestAPIResponseMessages } from '../../../common/restAPI/adminRestAPIResponseMessage';
import { CustomParameterizedContext } from '../../types';
import { Next } from 'koa';
import getAccount from '../../account/getAccount';
import getAccounts from '../../account/getAccounts';
import getGroupsContainingAccount from '../../account/getGroupsContainingAccount';
import getAccountsInGroup from '../../account/getAccountsInGroup';
import { getGroup } from '../../account/getGroup';
import { getGroups } from '../../account/getGroups';
import createGroup from '../../account/createGroup';
import addAccountToGroup from '../../account/addAccountToGroup';
import removeAccountFromGroup from '../../account/removeAccountFromGroup';

export async function handleGetAccount(ctx: CustomParameterizedContext, next: Next) {
  const requestMessage = ctx.request.body as AdminRestAPIRequestMessages.GetAccount;
  const { accountInternalId } = requestMessage;

  const account = await getAccount(accountInternalId);

  if (!account) {
    ctx.body = {
      isSuccessful: false,
      errorMessage: 'No such account exist',
    } as AdminRestAPIResponseMessages.GetAccount;
    return;
  }

  ctx.body = {
    isSuccessful: true,
    data: {
      account,
    },
  } as AdminRestAPIResponseMessages.GetAccount;
}

export async function handleGetAccounts(ctx: CustomParameterizedContext, next: Next) {
  const requestMessage = ctx.request.body as AdminRestAPIRequestMessages.GetAccounts;

  const accounts = await getAccounts();

  ctx.body = {
    isSuccessful: true,
    data: {
      accounts,
    },
  } as AdminRestAPIResponseMessages.GetAccounts;
}

export async function handleGetAccountsInGroup(ctx: CustomParameterizedContext, next: Next) {
  const requestMessage = ctx.request.body as AdminRestAPIRequestMessages.GetAccountsInGroup;
  const { groupInternalId } = requestMessage;

  const accountInternalIds = await getAccountsInGroup(groupInternalId);

  ctx.body = {
    isSuccessful: true,
    data: {
      accountInternalIds,
    },
  } as AdminRestAPIResponseMessages.GetAccountsInGroup;
}

export async function handleGetGroup(ctx: CustomParameterizedContext, next: Next) {
  const requestMessage = ctx.request.body as AdminRestAPIRequestMessages.GetGroup;
  const { groupInternalId } = requestMessage;

  const group = await getGroup(groupInternalId);

  if (!group) {
    ctx.body = {
      isSuccessful: false,
      errorMessage: 'No such group exist',
    } as AdminRestAPIResponseMessages.GetGroup;
    return;
  }

  ctx.body = {
    isSuccessful: true,
    data: {
      group,
    },
  } as AdminRestAPIResponseMessages.GetGroup;
}

export async function handleGetGroups(ctx: CustomParameterizedContext, next: Next) {
  const requestMessage = ctx.request.body as AdminRestAPIRequestMessages.GetGroups;

  const groups = await getGroups();

  ctx.body = {
    isSuccessful: true,
    data: {
      groups,
    },
  } as AdminRestAPIResponseMessages.GetGroups;
}

export async function handleGetGroupsContainingAccount(ctx: CustomParameterizedContext, next: Next) {
  const requestMessage = ctx.request.body as AdminRestAPIRequestMessages.GetGroupsContainingAccount;
  const { accountInternalId } = requestMessage;

  const groupInternalIds = await getGroupsContainingAccount(accountInternalId);

  ctx.body = {
    isSuccessful: true,
    data: {
      groupInternalIds,
    }
  } as AdminRestAPIResponseMessages.GetGroupsContainingAccount;
}

export async function handleCreateGroup(ctx: CustomParameterizedContext, next: Next) {
  const requestMessage = ctx.request.body as AdminRestAPIRequestMessages.CreateGroup;
  const { name } = requestMessage;

  await createGroup(name)
    .then(() => ctx.body = {
      isSuccessful: true,
      data: {},
    } as AdminRestAPIResponseMessages.CreateGroup)
    .catch(() => ctx.body = {
      isSuccessful: false,
      errorMessage: 'Unknown Error'
    } as AdminRestAPIResponseMessages.CreateGroup);
}

export async function handleAddAccountToGroup(ctx: CustomParameterizedContext, next: Next) {
  const requestMessage = ctx.request.body as AdminRestAPIRequestMessages.AddAccountToGroup;
  const {
    accountInternalId,
    groupInternalId,
  } = requestMessage;

  await addAccountToGroup(accountInternalId, groupInternalId)
    .then(() => ctx.body = {
      isSuccessful: true,
      data: {},
    } as AdminRestAPIResponseMessages.AddAccountToGroup)
    .catch(() => ctx.body = {
      isSuccessful: false,
      errorMessage: 'Unknown Error',
    } as AdminRestAPIResponseMessages.AddAccountToGroup);
}

export async function handleRemoveAccountFromGroup(ctx: CustomParameterizedContext, next: Next) {
  const requestMessage = ctx.request.body as AdminRestAPIRequestMessages.RemoveAccountFromGroup;
  const {
    accountInternalId,
    groupInternalId,
  } = requestMessage;

  await removeAccountFromGroup(accountInternalId, groupInternalId)
    .then(() => ctx.body = {
      isSuccessful: true,
      data: {},
    } as AdminRestAPIResponseMessages.RemoveAccountFromGroup)
    .catch(() => ctx.body = {
      isSuccessful: false,
      errorMessage: 'Unknown Error',
    } as AdminRestAPIResponseMessages.RemoveAccountFromGroup);
}
