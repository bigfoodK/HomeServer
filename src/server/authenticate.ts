import { Next } from 'koa';
import { CustomParameterizedContext } from './types';
import verifyToken from './authentication/verifyToken';
import getAccount from './account/getAccount';

export default async function authenticate(ctx: CustomParameterizedContext, next: Next) {
  const token = ctx.cookies.get('Authentication-Token');
  if (!token) {
    return await next();
  }

  const internalId = verifyToken(token);

  if (!internalId) {
    return await next();
  }

  const account = await getAccount(internalId);
  if (!account) {
    return await next();
  }

  ctx.state.account = account;
  await next();
}
