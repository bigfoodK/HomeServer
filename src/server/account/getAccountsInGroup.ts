import { accountsInGroupDatabase } from './accountDatabases';

export default async function getAccountsInGroup(groupInternalId: string) {
  const data = await accountsInGroupDatabase.stream<string>({ all: `${groupInternalId}.` }).catch(() => [] as { key: string, value: string }[]);
  return data.map(({key, value}) => value);
}
