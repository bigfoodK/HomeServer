import { groupsDatabase } from './accountDatabases';
import { Group } from '../../common/permission/types';

export async function getGroups(): Promise<Group[]> {
  return await groupsDatabase.all<Group>().catch(() => []);
}
