import { FastifyInstance } from 'fastify';
import SessionsController from '../controllers/SessionsController';

const sessionsController = new SessionsController();

export async function sessionsRoutes(app: FastifyInstance): Promise<void> {
  app.post('/sessions', sessionsController.create);
}
