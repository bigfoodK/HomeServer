import sendRestAPIMessage from '../sendRestAPIMessage';
import { AdminRestAPIRequestMessages } from '../../../common/restAPI/adminRestAPIRequestMessage';
import { AdminRestAPIResponseMessages } from '../../../common/restAPI/adminRestAPIResponseMessage';
import { Identity } from '../../../common/permission/types';

export async function getPermission(path: string) {
  return await sendRestAPIMessage<AdminRestAPIRequestMessages.GetPermission, AdminRestAPIResponseMessages.GetPermission>('/restAPI/admin/getPermission', {
    path,
  });
}

export async function getPermissions() {
  return await sendRestAPIMessage<AdminRestAPIRequestMessages.GetPermissions, AdminRestAPIResponseMessages.GetPermissions>('/restAPI/admin/getPermissions', {});
}

export async function addPermissionRule(
  path: string,
  allowAnonymous: boolean,
  allowedIdentities: Identity[],
  deniedIdentities: Identity[],
) {
  return await sendRestAPIMessage<AdminRestAPIRequestMessages.AddPermissionRule, AdminRestAPIResponseMessages.AddPermissionRule>('/restAPI/admin/addPermissionRule', {
    allowAnonymous,
    allowedIdentities,
    deniedIdentities,
    path,
  });
}

export async function removePermissionRule(
  path: string,
  permissionRuleInternalId: string,
) {
  return await sendRestAPIMessage<AdminRestAPIRequestMessages.RemovePermissionRule, AdminRestAPIResponseMessages.RemovePermissionRule>('/restAPI/admin/removePermissionRule', {
    path,
    permissionRuleInternalId,
  });
}
