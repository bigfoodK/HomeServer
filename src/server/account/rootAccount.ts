import { accountDatabase } from './accountDatabases';
import register from './register';
import readline from 'readline-sync';

export async function getRootAccountInternalId() {
  return await accountDatabase.get<string>('rootAccountInternalId').catch(() => makeRootAccount());
}

async function setRootAccountInternalId(rootAccountInternalId: string) {
  return await accountDatabase.put<string>('rootAccountInternalId', rootAccountInternalId);
}

async function makeRootAccount() {
  console.log("Let's make root account");
  const input: string[] = [];

  while (true) {
    input[0] = readline.question('Id: ');
    if (input[0]) {
      break;
    }
  }

  while (true) {
    input[1] = readline.question('Nickname: ');
    if (input[1]) {
      break;
    }
  }

  while (true) {
    input[2] = readline.questionNewPassword();
    if (input[2]) {
      break;
    }
  }

  const { internalId } = await register({
    id: input[0],
    nickname: input[1],
    password: input[2],
  });

  await setRootAccountInternalId(internalId);

  return internalId;
}
