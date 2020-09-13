import { accountsDatabase } from './accountDatabases';
import { Account } from '../../common/permission/types';

export default async function getAccounts(): Promise<Account[]> {
  return await accountsDatabase.all<Account>()
    .catch(() => []);
}
