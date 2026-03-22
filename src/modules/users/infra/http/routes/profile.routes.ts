import { FastifyInstance } from 'fastify';
import { authenticate } from '@shared/infra/http/plugins/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileController = new ProfileController();

export async function profileRoutes(app: FastifyInstance): Promise<void> {
  app.addHook('preHandler', authenticate);

  app.get('/profile', profileController.show);
  app.put('/profile', profileController.update);
}
