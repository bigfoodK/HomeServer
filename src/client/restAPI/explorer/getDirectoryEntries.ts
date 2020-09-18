import sendRestAPIMessage from '../sendRestAPIMessage';
import { ExplorerRestAPIRequestMessages } from '../../../common/restAPI/explorerRestAPIRequestMessage';
import { ExplorerRestAPIResponseMessages } from '../../../common/restAPI/explorerRestAPIResponseMessage';

export default async function getDirectoryEntries(path: string) {
  return await sendRestAPIMessage<
    ExplorerRestAPIRequestMessages.GetDirectoryEntries,
    ExplorerRestAPIResponseMessages.GetDirectoryEntries
  >(`/restAPI/explorer/getDirectoryEntries/${path}`, {});
}
