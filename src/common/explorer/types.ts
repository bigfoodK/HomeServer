export type DirectoryEntryType = 
  | 'directory'
  | 'video'
  | 'file'

export type DirectoryEntry = {
  type: DirectoryEntryType,
  name: string;
};
