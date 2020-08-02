import { Next } from 'koa';
import { AccountRestAPIRequestMessages } from '../../../common/restAPI/accountRestAPIRequestMessage';
import { AccountRestAPIResponseMessages } from '../../../common/restAPI/accountRestAPIResponseMessage';
import register, { RegisterError } from '../../account/register';
import { CustomParameterizedContext } from '../../types';

export default async function registerHandler(ctx: CustomParameterizedContext, next: Next) {
  const requestMessage = ctx.request.body as AccountRestAPIRequestMessages.Register;
  await register(requestMessage)
    .then(() => {
      ctx.body = {
        isSuccessful: true,
        data: {},
      } as AccountRestAPIResponseMessages.Register;
    })
    .catch((error: RegisterError) => {
      switch (error) {
        case 'Id already exist': {
          ctx.body = {
            isSuccessful: false,
            errorMessage: 'Id already exist',
          } as AccountRestAPIResponseMessages.Register
        } break;

        default: {
          throw error;
        }
      }
    });
}
