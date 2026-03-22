import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

class ProvidersController {
  public async index(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const userId = request.user.id;

    const listProviders = container.resolve(ListProvidersService);

    const providers = await listProviders.execute(userId);

    const providersWithoutPassword = providers.map(({ password, ...rest }) => rest);

    reply.send(providersWithoutPassword);
    return reply;
  }
}

export default ProvidersController;
