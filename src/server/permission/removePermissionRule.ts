import { permissionAboutPathDatabase } from './permissionDatabases';
import { Permission } from '../../common/permission/types';
import getPermissionAboutPath from './getPermissionAboutPath';

export default async function removePermissionRule(path: string, permissionRuleInternalId: string) {
  const permission = await getPermissionAboutPath(path);
  permission.rules = permission.rules.filter(rule => rule.internalId !== permissionRuleInternalId);

  await permissionAboutPathDatabase.put<Permission>(path, permission);
}
