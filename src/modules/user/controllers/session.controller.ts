import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import UserRepository from '../repositories/user.respository';
import AuthenticateUserService from '../services/authenticate-user.service';

class SessionController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const sessionSchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { email, password } = sessionSchema.parse(request.body);

    const authenticateUserService = new AuthenticateUserService(
      new UserRepository(),
      request.jwt,
    );

    const token = await authenticateUserService.authenticate({
      email,
      password,
    });

    reply.cookie('access_token', token, {
      path: '/',
      httpOnly: true,
      secure: true,
    });

    return { accessToken: token };
  }
}

export default SessionController;
