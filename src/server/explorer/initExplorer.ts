import fse from 'fs-extra';
import config from '../config';

export default async function initExplorer() {
  await fse.ensureDir(config.explorerRootPath);
}
