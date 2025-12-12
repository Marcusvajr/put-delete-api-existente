import bcrypt from 'bcrypt';

import { IUserRepository } from '../interfaces/IUserRepository';
import { AuthenticateUserDTO } from '../dtos/authenticate-user.dto';
import { JWT } from '@fastify/jwt';

class AuthenticateUserService {
  constructor(
    private userRepository: IUserRepository,
    private jwt: JWT,
  ) {}
  async authenticate({
    password,
    email,
  }: AuthenticateUserDTO): Promise<string> {
    const user = await this.userRepository.findByEmail(email);

    const isMatch = user && (await bcrypt.compare(password, user.password));

    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const token = this.jwt.sign(payload);

    return token;
  }
}

export default AuthenticateUserService;
