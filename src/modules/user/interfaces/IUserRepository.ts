import { CreateUserDTO } from '../dtos/create-user-dto';
import { User } from '../entities/User';

export interface IUserRepository {
  create(user: CreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
}
