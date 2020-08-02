import { accountDatabase } from './accountDatabases';
import { Account } from './types';

export default async function getAccount(internalId: string) {
  return await accountDatabase.get<Account>(internalId)
    .catch(() => null);
}
