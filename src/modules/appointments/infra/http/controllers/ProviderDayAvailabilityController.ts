import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { z } from 'zod';
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

const dayAvailabilityParamsSchema = z.object({
  provider_id: z.string().uuid(),
});

const dayAvailabilityQuerySchema = z.object({
  day: z.coerce.number(),
  month: z.coerce.number(),
  year: z.coerce.number(),
});

class ProviderDayAvailabilityController {
  public async index(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { provider_id } = dayAvailabilityParamsSchema.parse(request.params);
    const { day, month, year } = dayAvailabilityQuerySchema.parse(request.query);

    const listProviderDayAvailability = container.resolve(ListProviderDayAvailabilityService);

    const availability = await listProviderDayAvailability.execute({
      providerId: provider_id,
      day,
      month,
      year,
    });

    reply.send(availability);
    return reply;
  }
}

export default ProviderDayAvailabilityController;
