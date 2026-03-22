import { FastifyInstance } from 'fastify';
import { authenticate } from '@shared/infra/http/plugins/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

export async function appointmentsRoutes(app: FastifyInstance): Promise<void> {
  app.addHook('preHandler', authenticate);

  app.post('/appointments', appointmentsController.create);
  app.get('/appointments/me', providerAppointmentsController.index);
}
