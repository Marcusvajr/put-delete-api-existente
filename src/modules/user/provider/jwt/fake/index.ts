import { SignOptions, SignPayloadType } from '@fastify/jwt';

class JWT {
  sign(payload: SignPayloadType, options?: Partial<SignOptions>): string {
    // Implement JWT signing logic here
    return 'your-jwt-token';
  }
}

export default JWT;
