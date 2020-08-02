import dotenv from 'dotenv';
import { join } from 'path'

dotenv.config();

function getEnv(key: string, require?: boolean) {
  const value = process.env[key];
  if (!value && require) {
    throw new Error(`${key} is required in .env`);
  }
  return value;
}

export default {
  debug: getEnv('DEBUG') === 'true',
  httpPort: parseInt(getEnv('HTTP_PORT') || '80'),
  httpsPort: parseInt(getEnv('HTTPS_PORT') || '443'),
  keyPath: getEnv('KEY_PATH'),
  certPath: getEnv('CERT_PATH'),
  dbPath: getEnv('DB_PATH') || join(__dirname, '../../levelDB'),
  saltRound: parseInt(getEnv('SALT_ROUND') || '10'),
  jwtKey: getEnv('JWT_KEY', true) || '',
  jwtExpiresIn: getEnv('JWT_EXPIRES_IN') || '30d',
} as const;
