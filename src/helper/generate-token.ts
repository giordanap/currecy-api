import { tokenjwt } from '../plugins';

export const generateToken = (
  payload: any,
  tokenSecret: string,
  time?: number,
) => {
  const token: string = tokenjwt.sign(payload, tokenSecret || '123', {
    expiresIn: time || 60,
  });
  return token;
};
