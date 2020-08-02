import database from '../database';

const root = database.getSubDatabase('Account')

export const accountDatabase = root.getSubDatabase('account');

export const internalIdDatabase = root.getSubDatabase('internalId');

export const encryptedPasswordDatabase = root.getSubDatabase('encryptedPassword');

