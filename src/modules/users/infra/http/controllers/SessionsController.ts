import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { z } from 'zod';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const createSessionSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

class SessionsController {
  public async create(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { email, password } = createSessionSchema.parse(request.body);

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({ email, password });

    const { password: _, ...userWithoutPassword } = user;

    reply.send({ user: userWithoutPassword, token });
    return reply;
  }
}

export default SessionsController;
