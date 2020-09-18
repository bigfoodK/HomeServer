import Router from 'koa-router';
import RestAPI from './restAPI';
import send from 'koa-send';
import { join } from 'path';

const router = new Router();

router.use('/restAPI', RestAPI.router.routes())

router.get('/admin/:all*', async (ctx) => await send(ctx, 'index.html', {
  root: join(__dirname, '../public'),
}));

router.get('/explorer/:all*', async (ctx) => await send(ctx, 'index.html', {
  root: join(__dirname, '../public'),
}));

export default router;
