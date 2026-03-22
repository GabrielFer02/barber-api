import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { z } from 'zod';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

const monthAvailabilityParamsSchema = z.object({
  provider_id: z.string().uuid(),
});

const monthAvailabilityQuerySchema = z.object({
  month: z.coerce.number(),
  year: z.coerce.number(),
});

class ProviderMonthAvailabilityController {
  public async index(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { provider_id } = monthAvailabilityParamsSchema.parse(request.params);
    const { month, year } = monthAvailabilityQuerySchema.parse(request.query);

    const listProviderMonthAvailability = container.resolve(ListProviderMonthAvailabilityService);

    const availability = await listProviderMonthAvailability.execute({
      providerId: provider_id,
      month,
      year,
    });

    reply.send(availability);
    return reply;
  }
}

export default ProviderMonthAvailabilityController;
