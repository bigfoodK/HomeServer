import { permissionAboutPathDatabase } from './permissionDatabases';
import { Permission } from '../../common/permission/types';

export default async function getPermissionAboutPath(path: string) {
  return permissionAboutPathDatabase.get<Permission>(path).catch(() => {
    return {
      path,
      rules: [],
    } as Permission;
  });
}
