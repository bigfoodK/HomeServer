import { posix, join } from 'path';
import config from '../config';
import { promises as fs } from 'fs';
import { DirectoryEntry } from '../../common/explorer/types';

export default async function getDirectoryEntries(path: string) {
  const normalizedPath = posix.normalize(path);
  if (normalizedPath.startsWith('../')) {
    return [];
  }

  const separatedPath = normalizedPath.split('/');
  const fullPath = join(config.explorerRootPath, ...separatedPath);
  const dirEntries = await fs.readdir(fullPath, { withFileTypes: true });
  return dirEntries.map(dirent => {
    return {
      name: dirent.name,
      type: dirent.isDirectory() ? 'directory' : 'file',
    } as DirectoryEntry;
  })
}
