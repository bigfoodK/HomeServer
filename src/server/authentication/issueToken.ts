import jwt from 'jsonwebtoken';
import config from '../config';

export default function issueToken(internalId: string) {
  return jwt.sign({
    internalId,
  }, config.jwtKey, {
    expiresIn: config.jwtExpiresIn,
  });
}
