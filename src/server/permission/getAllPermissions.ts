import { permissionAboutPathDatabase } from './permissionDatabases';
import { Permission } from '../../common/permission/types';

export default async function getAllPermissions() {
  const data = await permissionAboutPathDatabase.stream<Permission>({ all: '' });
  return data.map(({key, value}) => value);
}
