import { getRootPermissionInternalId } from './rootPermission';

export default async function initPermission() {
  const rootPermissionInternalId = await getRootPermissionInternalId();

  console.log('rootPermissionInternalId: ', rootPermissionInternalId);
}
