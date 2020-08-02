import {internalIdDatabase, encryptedPasswordDatabase } from './accountDatabases';
import bcrypt from 'bcrypt';
import getAccount from './getAccount';

export type LoginError = 'ID not exist'

export default async function login(params: {
  id: string,
  password: string,
}) {
  const {
    id,
    password,
  } = params;

  const internalId = await internalIdDatabase.get<string>(id)
    .catch(reason => {
      if (reason.type !== 'NotFoundError') {
        throw reason;
      }
      throw <LoginError> 'ID not exist';
    });
  const encryptedPassword = await encryptedPasswordDatabase.get<string>(internalId);

  const loggedIn = await bcrypt.compare(password, encryptedPassword);

  if (!loggedIn) {
    return null;
  }

  return await getAccount(internalId);
}
