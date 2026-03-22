import { FastifyInstance } from 'fastify';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

export async function passwordRoutes(app: FastifyInstance): Promise<void> {
  app.post('/password/forgot', forgotPasswordController.create);
  app.post('/password/reset', resetPasswordController.create);
}
