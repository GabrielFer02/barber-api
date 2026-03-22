import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { z } from 'zod';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

const listAppointmentsSchema = z.object({
  day: z.coerce.number(),
  month: z.coerce.number(),
  year: z.coerce.number(),
});

class ProviderAppointmentsController {
  public async index(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const providerId = request.user.id;
    const { day, month, year } = listAppointmentsSchema.parse(request.query);

    const listProviderAppointments = container.resolve(ListProviderAppointmentsService);

    const appointments = await listProviderAppointments.execute({
      providerId,
      day,
      month,
      year,
    });

    reply.send(appointments);
    return reply;
  }
}

export default ProviderAppointmentsController;
