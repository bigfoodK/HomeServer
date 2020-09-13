export type Account = {
  type: 'account';

  id: string;
  nickname: string;
  createdAt: number;
  internalId: string;
};

export type Group = {
  type: 'group';

  name: string;
  createdAt: number;
  internalId: string;
};

export type Identity = Account | Group;

export type PermissionRule = {
  internalId: string;
  allowAnonymous: boolean;
  allowedIdentities: Identity[];
  deniedIdentities: Identity[];
}

export type Permission = {
  path: string;
  rules: PermissionRule[];
}
