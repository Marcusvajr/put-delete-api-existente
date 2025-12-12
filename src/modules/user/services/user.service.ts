import { CreateUserDTO } from '../dtos/create-user-dto';
import { User } from '../entities/User';
import bcrypt from 'bcrypt';

import { IUserRepository } from '../interfaces/IUserRepository';

const SALT_ROUNDS = 10;

class UserService {
  constructor(private userRepository: IUserRepository) {}
  async create({ name, email, password }: CreateUserDTO): Promise<User> {
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new Error('Email already in use');
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await this.userRepository.create({
      name,
      email,
      password: hash,
    });

    return user;
  }
}

export default UserService;
