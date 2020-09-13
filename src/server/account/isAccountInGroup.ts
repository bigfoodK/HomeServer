import { accountsInGroupDatabase } from './accountDatabases';

export default async function isAccountInGroup(accountInternalId: string, groupInternalId: string) {
  return accountsInGroupDatabase.exists(`${groupInternalId}.${accountInternalId}`);
}
