import database from '../database';

export const accountDatabase = database.getSubDatabase('Account')

export const accountsDatabase = accountDatabase.getSubDatabase('accounts');

export const internalIdDatabase = accountDatabase.getSubDatabase('internalId');

export const encryptedPasswordDatabase = accountDatabase.getSubDatabase('encryptedPassword');

export const groupsDatabase = accountDatabase.getSubDatabase('groups');

export const groupsContainingAccountDatabase = accountDatabase.getSubDatabase('groupsContainingAccount');

export const accountsInGroupDatabase = accountDatabase.getSubDatabase('accountsInGroup');

