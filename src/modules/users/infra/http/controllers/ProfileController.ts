import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { z } from 'zod';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

const updateProfileSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  old_password: z.string().optional(),
  password: z.string().min(6).optional(),
  password_confirmation: z.string().optional(),
}).refine(data => {
  if (data.password && data.password !== data.password_confirmation) {
    return false;
  }
  return true;
}, { message: 'Password confirmation does not match', path: ['password_confirmation'] });

class ProfileController {
  public async show(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const userId = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute(userId);

    const { password: _, ...userWithoutPassword } = user;

    reply.send(userWithoutPassword);
    return reply;
  }

  public async update(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const userId = request.user.id;
    const { name, email, old_password, password } = updateProfileSchema.parse(request.body);

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      userId,
      name,
      email,
      oldPassword: old_password,
      password,
    });

    const { password: _, ...userWithoutPassword } = user;

    reply.send(userWithoutPassword);
    return reply;
  }
}

export default ProfileController;
