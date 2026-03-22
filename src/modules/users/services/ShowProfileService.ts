import { injectable, inject } from 'tsyringe';
import type IUsersRepository from '../repositories/IUsersRepository';
import type { IUser } from '../repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  public async execute(userId: string): Promise<IUser> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}

export default ShowProfileService;
