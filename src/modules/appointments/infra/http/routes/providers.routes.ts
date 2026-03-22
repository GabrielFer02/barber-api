import { FastifyInstance } from 'fastify';
import { authenticate } from '@shared/infra/http/plugins/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

export async function providersRoutes(app: FastifyInstance): Promise<void> {
  app.addHook('preHandler', authenticate);

  app.get('/providers', providersController.index);
  app.get('/providers/:provider_id/month-availability', providerMonthAvailabilityController.index);
  app.get('/providers/:provider_id/day-availability', providerDayAvailabilityController.index);
}
