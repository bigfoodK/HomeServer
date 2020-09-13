import { accountDatabase } from './accountDatabases';
import createGroup from './createGroup';

export async function getDefaultGroupInternalId() {
  return await accountDatabase.get<string>('defaultGroupInternalId').catch(() => makeDefaultGroup());
}

async function setDefaultGroupInternalId(defaultGroupInternalId: string) {
  return await accountDatabase.put<string>('defaultGroupInternalId', defaultGroupInternalId);
}

async function makeDefaultGroup() {
  const internalId = await createGroup('default');

  await setDefaultGroupInternalId(internalId);

  return internalId;
}
