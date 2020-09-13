import { groupsContainingAccountDatabase, accountsInGroupDatabase } from './accountDatabases';

export default async function removeAccountFromGroup(accountInternalId: string, groupInternalId: string) {
  await Promise.all([
    groupsContainingAccountDatabase.del(`${accountInternalId}.${groupInternalId}`),
    accountsInGroupDatabase.del(`${groupInternalId}.${accountInternalId}`),
  ])
}
