import { getRootAccountInternalId } from './rootAccount';
import { getDefaultGroupInternalId } from './defaultGroup';

export default async function initAccount() {
  const defaultGroupInternalId = await getDefaultGroupInternalId();
  const rootAccountInternalId = await getRootAccountInternalId();

  console.log('rootAccountInternalId: ', rootAccountInternalId);
  console.log('defaultGroupInternalId: ', defaultGroupInternalId);
}
