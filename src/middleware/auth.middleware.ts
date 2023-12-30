import { verifyToken } from 'src/helper';
import { FastifyReply } from 'fastify';

export const authMiddleware = (res: FastifyReply, authorization?: string) => {
  const token = authorization.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ message: 'Token not provided' });
  }

  try {
    const payload = verifyToken(token, process.env.TOKEN_SECRET);
    return payload;
  } catch (error) {
    return res.status(401).send({ message: 'Invalid token provided' });
  }
};
