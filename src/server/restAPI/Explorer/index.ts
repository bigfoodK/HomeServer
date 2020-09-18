import Router from 'koa-router';
import getDirectoryEntriesHandler from './getDirectoryEntriesHandler';

const router = new Router();

router.post('/getDirectoryEntries/:path*', getDirectoryEntriesHandler);

const Explorer = {
  router: router,
}

export default Explorer;
