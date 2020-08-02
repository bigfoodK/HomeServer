import Router from 'koa-router';
import RestAPI from './restAPI';

const router = new Router();

router.use('/restAPI', RestAPI.router.routes())

export default router;
