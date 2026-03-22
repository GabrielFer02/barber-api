import { FastifyInstance } from 'fastify';
import { authenticate } from '@shared/infra/http/plugins/ensureAuthenticated';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

export async function usersRoutes(app: FastifyInstance): Promise<void> {
  app.post('/users', usersController.create);
  app.patch('/users/avatar', { preHandler: [authenticate] }, userAvatarController.update);
}
