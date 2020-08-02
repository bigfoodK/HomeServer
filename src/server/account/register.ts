import { uuid } from '../../common/util/uuid';
import { Account } from './types';
import { accountDatabase, internalIdDatabase, encryptedPasswordDatabase } from './accountDatabases';
import bcrypt from 'bcrypt';
import config from '../config';

export type RegisterError =
  'Id already exist'

export default async function register(params: {
  id: string,
  password: string,
  nickname: string,
}) {
  const {
    id,
    password,
    nickname,
  } = params;

  const internalId = uuid();
  const encryptedPassword = await bcrypt.hash(password, config.saltRound);

  const idExist = !!await internalIdDatabase.get(id)
    .catch(error => {
      if (error.type === 'NotFoundError') {
        return null;
      }
      throw error;
    });

  if (idExist) {
    throw <RegisterError>'Id already exist';
  }

  const result = await Promise.all([
    internalIdDatabase.put<string>(id, internalId),

    encryptedPasswordDatabase.put<string>(internalId, encryptedPassword),

    accountDatabase.put<Account>(internalId, {
      createdAt: Date.now(),
      id,
      nickname,
      internalId,
    }),
  ]);

  return {
    internalId: result[0],
    encryptedPassword: result[1],
    account: result[2],
  }
}
