import { Account } from './account/types'
import { ParameterizedContext } from 'koa'

type CustomState = {
  account?: Account;
}

export type CustomParameterizedContext = ParameterizedContext<CustomState>;
