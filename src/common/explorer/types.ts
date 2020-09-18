export type DirectoryEntryType = 
  | 'directory'
  | 'file'

export type DirectoryEntry = {
  type: DirectoryEntryType,
  name: string;
};
