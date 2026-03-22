import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { z } from 'zod';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';

const resetPasswordSchema = z.object({
  token: z.string().uuid(),
  password: z.string().min(6),
  password_confirmation: z.string(),
}).refine(data => data.password === data.password_confirmation, {
  message: 'Password confirmation does not match',
  path: ['password_confirmation'],
});

class ResetPasswordController {
  public async create(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { token, password } = resetPasswordSchema.parse(request.body);

    const resetPassword = container.resolve(ResetPasswordService);

    await resetPassword.execute({ token, password });

    reply.status(204).send();
    return reply;
  }
}

export default ResetPasswordController;
