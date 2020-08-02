import { Next } from 'koa';
import login, { LoginError } from '../../account/login';
import { AccountRestAPIRequestMessages } from '../../../common/restAPI/accountRestAPIRequestMessage';
import { AccountRestAPIResponseMessages } from '../../../common/restAPI/accountRestAPIResponseMessage';
import { CustomParameterizedContext } from '../../types';
import issueToken from '../../authentication/issueToken';

export default async function loginHandler(ctx: CustomParameterizedContext, next: Next) {
  const requestMessage = ctx.request.body as AccountRestAPIRequestMessages.Login;

  await login(requestMessage)
    .then(account => {
      if (!account) {
        ctx.body = {
          isSuccessful: false,
          errorMessage: 'Unmatched password'
        } as AccountRestAPIResponseMessages.Login
        return;
      }

      ctx.body = {
        isSuccessful: true,
        data: {
          id: account.id,
          nickname: account.nickname,
          token: issueToken(account.internalId),
        },
      } as AccountRestAPIResponseMessages.Login
    })
    .catch((error: LoginError) => {
      switch (error) {
        case 'ID not exist': {
          ctx.body = {
            isSuccessful: false,
            errorMessage: 'ID not exist',
          } as AccountRestAPIResponseMessages.Login
        } break;

        default: {
          throw error;
        }
      }
    });
}
