import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { z } from 'zod';
import CreateUserService from '@modules/users/services/CreateUserService';

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

class UsersController {
  public async create(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { name, email, password } = createUserSchema.parse(request.body);

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ name, email, password });

    const { password: _, ...userWithoutPassword } = user;

    reply.status(201).send(userWithoutPassword);
    return reply;
  }
}

export default UsersController;
