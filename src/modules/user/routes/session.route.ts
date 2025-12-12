import { FastifyInstance } from 'fastify';

import SessionController from '../controllers/session.controller';

const sessionController = new SessionController();

export async function sessionRoute(app: FastifyInstance) {
  app.post('/', sessionController.create);
}
