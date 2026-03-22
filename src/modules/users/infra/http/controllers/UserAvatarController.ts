import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import uploadConfig from '@config/upload';
import { randomBytes } from 'crypto';
import path from 'path';
import { pipeline } from 'stream/promises';
import fs from 'fs';

class UserAvatarController {
  public async update(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    let filePart: any = null;

    for await (const part of request.parts()) {
      if (part.type === 'file') {
        filePart = part;
        break;
      }
    }

    if (!filePart) {
      reply.status(400).send({ status: 'error', message: 'No file uploaded' });
      return reply;
    }

    const fileHash = randomBytes(10).toString('hex');
    const filename = `${fileHash}-${filePart.filename}`;
    const filepath = path.resolve(uploadConfig.tmpFolder, filename);

    await pipeline(filePart.file, fs.createWriteStream(filepath));

    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      userId: request.user.id,
      avatarFilename: filename,
    });

    const { password: _, ...userWithoutPassword } = user;

    reply.send(userWithoutPassword);
    return reply;
  }
}

export default UserAvatarController;
