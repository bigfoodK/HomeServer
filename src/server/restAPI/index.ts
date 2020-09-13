import Router from 'koa-router';
import Account from './Account';
import Admin from './Admin';

const router = new Router();

router.use('/account', Account.router.routes());
router.use('/admin', Admin.router.routes());

const RestAPI = {
  router: router,
}

export default RestAPI;
