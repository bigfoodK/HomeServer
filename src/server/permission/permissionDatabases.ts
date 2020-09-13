import database from '../database';

export const permissionDatabase = database.getSubDatabase('Permission')

export const permissionAboutPathDatabase = permissionDatabase.getSubDatabase('aboutPath');
