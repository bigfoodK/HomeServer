import { Record } from 'immutable';

class AccountState extends Record<{
  id: string;
  loggedIn: boolean;
  nickname: string;
}>({
  id: '',
  loggedIn: false,
  nickname: '',
}) {};

export class State extends Record<{
  account: AccountState;
}>({
  account: new AccountState(),
}) {};
