import { describe, expect, it } from 'vitest';
import UserRepository from '../repositories/fakes/user.repository';
import UserService from './user.service';

describe('UserService', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new UserRepository();
    const userService = new UserService(fakeUserRepository);

    const user = await userService.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUserRepository = new UserRepository();
    const userService = new UserService(fakeUserRepository);

    await userService.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    expect(
      userService.create({
        name: 'Jane Doe',
        email: 'john.doe@example.com',
        password: 'password456',
      }),
    ).rejects.toThrow('Email already in use');
  });
});
