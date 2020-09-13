import { groupsContainingAccountDatabase } from './accountDatabases';

export default async function getGroupsContainingAccount(accountInternalId: string) {
  const data = await groupsContainingAccountDatabase.stream<string>({ all: `${accountInternalId}.` }).catch(() => [] as { key: string, value: string }[]);
  return data.map(({key, value}) => value);
}
