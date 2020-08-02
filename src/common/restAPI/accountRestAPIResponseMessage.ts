import { RestAPIResponseMessage } from './types';

export namespace AccountRestAPIResponseMessages {
  export type Register = RestAPIResponseMessage<{},
    'Id already exist'
  >

  export type Login = RestAPIResponseMessage<{
    token: string,
    nickname: string,
    id: string,
  },
    'ID not exist'
    | 'Unmatched password'
  >
}
