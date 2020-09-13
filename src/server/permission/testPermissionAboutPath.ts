import { Identity, PermissionRule } from '../../common/permission/types';
import getPermissionAboutPath from './getPermissionAboutPath';
import { posix } from 'path';
import isAccountInGroup from '../account/isAccountInGroup';

const {
  normalize,
  join,
} = posix;

async function some<T>(array: T[], predicate: (element: T) => Promise<boolean>) {
  for (let element of array) {
    if (await predicate(element)) return true;
  }
  return false;
};

async function every<T>(array: T[], predicate: (element: T) => Promise<boolean>) {
	for (let element of array) {
		if (!await predicate(element)) return false;
	}
	return true;
};

async function isAccountPresentInIdentities(accountInternalId: string, identities: Identity[]) {
  return some(identities, async identity => {
    if (identity.type === 'account') {
      return accountInternalId === identity.internalId;
    }
    return await isAccountInGroup(accountInternalId, identity.internalId);
  })
}

async function testPermissionAboutRule(accountInternalId: string, rule: PermissionRule) {
  const isForbidden = await isAccountPresentInIdentities(accountInternalId, rule.deniedIdentities);
  if (isForbidden) {
    return false;
  }

  if (rule.allowAnonymous) {
    return true;
  }

  const isAllowed = await isAccountPresentInIdentities(accountInternalId, rule.allowedIdentities);
  return isAllowed;
}

export default async function testPermissionAboutPath(accountInternalId: string, path: string): Promise<boolean> {
  const normalizedPath = join(normalize(path), '.');
  const permission = await getPermissionAboutPath(normalizedPath);
  if (permission.rules.length < 1) {
    const upperPath = join(normalizedPath, '..');
    return testPermissionAboutPath(accountInternalId, upperPath);
  }

  return every(permission.rules, rule => testPermissionAboutRule(accountInternalId, rule));
}
