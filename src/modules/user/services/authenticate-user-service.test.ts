import { describe, expect, it, beforeEach } from 'vitest';
import UserRepository from '../repositories/fakes/user.repository';
import JWT from '../provider/jwt/fake';
import { JWT as FastifyJWT } from '@fastify/jwt';

import AuthenticateUserService from './authenticate-user.service';
import UserService from './user.service';

let authenticateUserService: AuthenticateUserService;

let jwt: FastifyJWT;
let userRepository: UserRepository;
let userService: UserService;

describe('AuthenticateUserService', () => {
  beforeEach(() => {
    jwt = new JWT() as FastifyJWT;
    userRepository = new UserRepository();
    userService = new UserService(userRepository);
    authenticateUserService = new AuthenticateUserService(userRepository, jwt);
  });

  // DRY Don't repeat yourself

  it('should be able to authenticate', async () => {
    const user = await userService.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    const result = await authenticateUserService.authenticate({
      email: user.email,
      password: 'password123',
    });

    expect(result).toBe('your-jwt-token');
  });

  it('should not be able to authenticate with non existing user', async () => {
    expect(
      authenticateUserService.authenticate({
        email: 'john.doe@example',
        password: 'password123',
      }),
    ).rejects.toThrow('Invalid email or password');
  });

  it('should not be able to authenticate with incorrect password', async () => {
    const user = await userService.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    expect(
      authenticateUserService.authenticate({
        email: user.email,
        password: 'password12',
      }),
    ).rejects.toThrow('Invalid email or password');
  });
});
