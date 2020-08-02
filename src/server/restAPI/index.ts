import Router from 'koa-router';
import Account from './Account';

const router = new Router();

router.use('/account', Account.router.routes())

const RestAPI = {
  router: router,
}

export default RestAPI;
