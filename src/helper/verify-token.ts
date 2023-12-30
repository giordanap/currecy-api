import { tokenjwt } from '../plugins';

export const verifyToken = (token: string, tokenSecret: string) => {
  const payload = tokenjwt.verify(token, tokenSecret || '123456');
  return payload;
};
