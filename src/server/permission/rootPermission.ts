import addPermissionRuleToPath from './addPermissionRuleToPath';
import { uuid } from '../../common/util/uuid';
import { permissionDatabase } from './permissionDatabases';

export async function getRootPermissionInternalId() {
  return permissionDatabase.get<string>('rootPermissionInternalId').catch(() => makeRootPermission());
}

async function makeRootPermission() {
  const internalId = uuid();

  await Promise.all([
    addPermissionRuleToPath({
      allowAnonymous: true,
      allowedIdentities: [],
      deniedIdentities: [],
      internalId,
    }, '/'),

    permissionDatabase.put<string>('rootPermissionInternalId', internalId),
  ]);

  return internalId;
}
