import { accountsDatabase } from './accountDatabases';
import { Account } from '../../common/permission/types';

export default async function getAccount(internalId: string) {
  return await accountsDatabase.get<Account>(internalId)
    .catch(() => null);
}
