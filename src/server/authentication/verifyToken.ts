import jwt from 'jsonwebtoken';
import config from '../config';

export default function verifyToken(token: string) {
  try {
    const verified = jwt.verify(token, config.jwtKey) as {
      internalId: string,
      iat: number,
      exp: number,
    }
    return verified.internalId;
  } catch (error) {
    if (error.message !== 'invalid token') {
      throw error;
    }
    return null;
  }
}
