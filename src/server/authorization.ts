import { Next } from 'koa';
import { CustomParameterizedContext } from './types';
import testPermissionAboutPath from './permission/testPermissionAboutPath';
import { RestAPIResponseMessage } from '../common/restAPI/types';

export default async function authorization(ctx: CustomParameterizedContext, next: Next) {
  const path = ctx.path;
  const accountInternalId = ctx.state.account?.internalId || '';
  const isAllowed = await testPermissionAboutPath(accountInternalId, path);

  if (isAllowed) {
    await next();
    return;
  }

  if (path.startsWith('/restAPI')) {
    ctx.body = {
      isSuccessful: false,
      errorMessage: 'Forbidden',
    } as RestAPIResponseMessage;
    return;
  }

  ctx.status = 403;
  return;
}
