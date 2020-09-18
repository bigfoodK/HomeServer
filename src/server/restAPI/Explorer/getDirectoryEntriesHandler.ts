import { CustomParameterizedContext } from '../../types';
import { Next } from 'koa';
import { IRouterParamContext } from 'koa-router';
import getDirectoryEntries from '../../explorer/getDirectoryEntries';
import { ExplorerRestAPIResponseMessages } from '../../../common/restAPI/explorerRestAPIResponseMessage';

export default async function getDirectoryEntriesHandler(ctx: IRouterParamContext & CustomParameterizedContext, next: Next) {
  const path = ctx.params.path || '';

  const directoryEntries = await getDirectoryEntries(path)
    .catch((error) => {
      if (error.code === 'ENOENT') {
        return [];
      }
      throw error;
    });
  ctx.body = {
    isSuccessful: true,
    data: {
      directoryEntries,
    },
  } as ExplorerRestAPIResponseMessages.GetDirectoryEntries;
}
