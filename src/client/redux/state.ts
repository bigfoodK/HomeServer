import { Record, List } from 'immutable';
import { Permission, Account, Group } from '../../common/permission/types';

class AccountState extends Record<{
  id: string;
  loggedIn: boolean;
  nickname: string;
}>({
  id: '',
  loggedIn: false,
  nickname: '',
}) {};

class AdminState extends Record<{
  accounts: List<Account>;
  groups: List<Group>;
  permissions: List<Permission>;
}>({
  accounts: List<Account>(),
  groups: List<Group>(),
  permissions: List<Permission>(),
}) {};


export class State extends Record<{
  account: AccountState;
  admin: AdminState;
}>({
  account: new AccountState(),
  admin: new AdminState(),
}) {};
