import { groupsDatabase } from './accountDatabases';
import { Group } from '../../common/permission/types';

export async function getGroup(internalId: string) {
  return await groupsDatabase.get<Group>(internalId).catch(() => null);
}
