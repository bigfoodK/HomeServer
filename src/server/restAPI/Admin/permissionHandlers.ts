import { AdminRestAPIRequestMessages } from '../../../common/restAPI/adminRestAPIRequestMessage';
import { AdminRestAPIResponseMessages } from '../../../common/restAPI/adminRestAPIResponseMessage';
import { CustomParameterizedContext } from '../../types';
import { Next } from 'koa';
import getPermissionAboutPath from '../../permission/getPermissionAboutPath';
import getAllPermissions from '../../permission/getAllPermissions';
import addPermissionRuleToPath from '../../permission/addPermissionRuleToPath';
import { uuid } from '../../../common/util/uuid';
import removePermissionRule from '../../permission/removePermissionRule';

export async function handleGetPermission(ctx: CustomParameterizedContext, next: Next) {
  const requestMessage = ctx.request.body as AdminRestAPIRequestMessages.GetPermission;
  const { path } = requestMessage;

  const permission = await getPermissionAboutPath(path);

  ctx.body = {
    isSuccessful: true,
    data: {
      permission,
    },
  } as AdminRestAPIResponseMessages.GetPermission;
}

export async function handleGetPermissions(ctx: CustomParameterizedContext, next: Next) {
  const requestMessage = ctx.request.body as AdminRestAPIRequestMessages.GetPermissions;

  const permissions = await getAllPermissions();

  ctx.body = {
    isSuccessful: true,
    data: {
      permissions,
    },
  } as AdminRestAPIResponseMessages.GetPermissions;
}

export async function handleAddPermissionRule(ctx: CustomParameterizedContext, next: Next) {
  const requestMessage = ctx.request.body as AdminRestAPIRequestMessages.AddPermissionRule;
  const {
    allowAnonymous,
    allowedIdentities,
    deniedIdentities,
    path,
  } = requestMessage;

  await addPermissionRuleToPath({
    allowAnonymous,
    allowedIdentities,
    deniedIdentities,
    internalId: uuid(),
  }, path);

  ctx.body = {
    isSuccessful: true,
    data: {},
  } as AdminRestAPIResponseMessages.AddPermissionRule;
}

export async function handleRemovePermissionRule(ctx: CustomParameterizedContext, next: Next) {
  const requestMessage = ctx.request.body as AdminRestAPIRequestMessages.RemovePermissionRule;

  const {
    path,
    permissionRuleInternalId,
  } = requestMessage;

  await removePermissionRule(path, permissionRuleInternalId);

  ctx.body = {
    isSuccessful: true,
    data: {},
  } as AdminRestAPIResponseMessages.RemovePermissionRule;
}
