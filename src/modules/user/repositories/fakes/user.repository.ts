import { randomUUID } from 'crypto';
import { CreateUserDTO } from '../../dtos/create-user-dto';
import { User } from '../../entities/User';
import { IUserRepository } from '../../interfaces/IUserRepository';

class UserRepository implements IUserRepository {
  private users: User[] = [];

  async create({ name, email, password }: CreateUserDTO): Promise<User> {
    const user = { id: randomUUID(), name, email, password } as User;

    this.users.push(user);

    return user;
  }
  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }
}

export default UserRepository;
