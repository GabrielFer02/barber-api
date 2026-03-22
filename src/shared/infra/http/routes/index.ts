import { FastifyInstance } from 'fastify';

import { usersRoutes } from '@modules/users/infra/http/routes/users.routes';
import { sessionsRoutes } from '@modules/users/infra/http/routes/sessions.routes';
import { passwordRoutes } from '@modules/users/infra/http/routes/password.routes';
import { profileRoutes } from '@modules/users/infra/http/routes/profile.routes';
import { appointmentsRoutes } from '@modules/appointments/infra/http/routes/appointments.routes';
import { providersRoutes } from '@modules/appointments/infra/http/routes/providers.routes';

export async function routes(app: FastifyInstance): Promise<void> {
  app.get('/health', async () => {
    return { status: 'ok' };
  });

  await app.register(usersRoutes);
  await app.register(sessionsRoutes);
  await app.register(passwordRoutes);
  await app.register(profileRoutes);
  await app.register(appointmentsRoutes);
  await app.register(providersRoutes);
}
