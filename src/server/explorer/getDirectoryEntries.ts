import { posix, join, extname } from 'path';
import config from '../config';
import { promises as fs } from 'fs';
import { DirectoryEntry, DirectoryEntryType } from '../../common/explorer/types';

function getType(name: string): DirectoryEntryType {
  const extName = extname(name);
  switch (extName) {
    case '.mkv':
    case '.mp4': {
      return 'video';
    } break;
  
    default: {
      return 'file';
    } break;
  }
}

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
      type: dirent.isDirectory() ? 'directory' : getType(dirent.name),
    } as DirectoryEntry;
  })
}
