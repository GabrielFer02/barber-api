import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { z } from 'zod';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

class ForgotPasswordController {
  public async create(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { email } = forgotPasswordSchema.parse(request.body);

    const sendForgotPasswordEmail = container.resolve(SendForgotPasswordEmailService);

    await sendForgotPasswordEmail.execute(email);

    reply.status(204).send();
    return reply;
  }
}

export default ForgotPasswordController;
