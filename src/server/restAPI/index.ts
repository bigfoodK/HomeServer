import Router from 'koa-router';
import Account from './Account';
import Admin from './Admin';
import Explorer from './Explorer';

const router = new Router();

router.use('/account', Account.router.routes());
router.use('/admin', Admin.router.routes());
router.use('/explorer', Explorer.router.routes());

const RestAPI = {
  router: router,
}

export default RestAPI;
