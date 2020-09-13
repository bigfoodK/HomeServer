import { ParameterizedContext } from 'koa'
import { Account } from '../common/permission/types';

type CustomState = {
  account?: Account;
}

export type CustomParameterizedContext = ParameterizedContext<CustomState>;
