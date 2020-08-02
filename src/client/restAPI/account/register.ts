import { AccountRestAPIRequestMessages } from '../../../common/restAPI/accountRestAPIRequestMessage'
import { AccountRestAPIResponseMessages } from '../../../common/restAPI/accountRestAPIResponseMessage'
import sendRestAPIMessage from '../sendRestAPIMessage'

export default async function register(params: AccountRestAPIRequestMessages.Register) {
  return await sendRestAPIMessage<AccountRestAPIRequestMessages.Register, AccountRestAPIResponseMessages.Register>('/restAPI/account/register', params);
}
