import { groupsDatabase } from "./accountDatabases";
import { uuid } from '../../common/util/uuid';
import { Group } from '../../common/permission/types';

export default async function createGroup(name: string) {
  const internalId = uuid();

  await groupsDatabase.put<Group>(internalId, {
    type: 'group',
    name,
    createdAt: Date.now(),
    internalId,
  });

  return internalId;
}
