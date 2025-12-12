import { FastifyReply, FastifyRequest } from 'fastify';

type UserPayload = {
  id: string;
  name: string;
  email: string;
};

export async function checkUserAuthentication(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { access_token } = request.cookies;

  if (!access_token) {
    return reply.status(401).send({
      error: 'Authentication required',
    });
  }

  try {
    const decoded = request.jwt.verify<UserPayload>(access_token);
    request.user = decoded;
  } catch {
    return reply.status(401).send({
      error: 'Invalid or expired token',
    });
  }
}
