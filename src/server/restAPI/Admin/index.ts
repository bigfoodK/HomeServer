import Router from 'koa-router';
import { handleGetAccount, handleGetAccounts, handleGetAccountsInGroup, handleGetGroup, handleGetGroups, handleGetGroupsContainingAccount, handleCreateGroup, handleAddAccountToGroup, handleRemoveAccountFromGroup } from './accountHandlers';
import { handleGetPermission, handleGetPermissions, handleAddPermissionRule, handleRemovePermissionRule } from './permissionHandlers';

const router = new Router();

router.post('/getAccount', handleGetAccount);
router.post('/getAccounts', handleGetAccounts);
router.post('/getAccountsInGroup', handleGetAccountsInGroup);
router.post('/getGroup', handleGetGroup);
router.post('/getGroups', handleGetGroups);
router.post('/getGroupsContainedAccount', handleGetGroupsContainingAccount);
router.post('/createGroup', handleCreateGroup);
router.post('/addAccountToGroup', handleAddAccountToGroup);
router.post('/removeAccountFromGroup', handleRemoveAccountFromGroup);
router.post('/getPermission', handleGetPermission);
router.post('/getPermissions', handleGetPermissions);
router.post('/addPermissionRule', handleAddPermissionRule);
router.post('/removePermissionRule', handleRemovePermissionRule);

const Admin = {
  router: router,
}

export default Admin;
