import Router from 'koa-router';
import register from './registerHandler';
import login from './loginHandler';

const router = new Router();

router.post('/register', register);
router.post('/login', login);

const Account = {
  router: router,
}

export default Account;
