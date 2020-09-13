import { groupsContainingAccountDatabase, accountsInGroupDatabase } from './accountDatabases';

export default async function addAccountToGroup(accountInternalId: string, groupInternalId: string) {
  await Promise.all([
    groupsContainingAccountDatabase.put(`${accountInternalId}.${groupInternalId}`, groupInternalId),

    accountsInGroupDatabase.put(`${groupInternalId}.${accountInternalId}`, accountInternalId),
  ]);
}
