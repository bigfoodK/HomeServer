import { RestAPIResponseMessage } from './types';
import { DirectoryEntry } from '../explorer/types';

export namespace ExplorerRestAPIResponseMessages {
  export type GetDirectoryEntries = RestAPIResponseMessage<{
    directoryEntries: DirectoryEntry[],
  }>
}
