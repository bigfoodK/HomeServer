import { PermissionRule, Permission } from '../../common/permission/types';
import getPermissionAboutPath from './getPermissionAboutPath';
import { permissionAboutPathDatabase } from './permissionDatabases';

export default async function addPermissionRuleToPath(permissionRule: PermissionRule, path: string) {
  const permission = await getPermissionAboutPath(path);
  permission.rules = permission.rules.filter(rule => rule.internalId !== permissionRule.internalId);
  permission.rules.push(permissionRule);

  await permissionAboutPathDatabase.put<Permission>(path, permission);
}
