import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { z } from 'zod';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

const createAppointmentSchema = z.object({
  provider_id: z.string().uuid(),
  date: z.coerce.date(),
});

class AppointmentsController {
  public async create(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const userId = request.user.id;
    const { provider_id, date } = createAppointmentSchema.parse(request.body);

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      providerId: provider_id,
      userId,
      date,
    });

    reply.status(201).send(appointment);
    return reply;
  }
}

export default AppointmentsController;
