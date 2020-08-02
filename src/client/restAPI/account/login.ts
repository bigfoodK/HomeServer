import { AccountRestAPIRequestMessages } from '../../../common/restAPI/accountRestAPIRequestMessage'
import { AccountRestAPIResponseMessages } from '../../../common/restAPI/accountRestAPIResponseMessage'
import sendRestAPIMessage from '../sendRestAPIMessage'
import { dispatch } from '../../redux/store';
import Actions from '../../redux/actions';

export default async function login(params: AccountRestAPIRequestMessages.Login) {
  const response = await sendRestAPIMessage<AccountRestAPIRequestMessages.Login, AccountRestAPIResponseMessages.Login>('/restAPI/account/login', params);

  if (response.isSuccessful) {
    const {
      token,
      id,
      nickname,
    } = response.data;
    dispatch(Actions.login(token, id, nickname));
  }
  return response;
}
