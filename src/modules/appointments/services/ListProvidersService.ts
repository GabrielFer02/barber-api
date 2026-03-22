import { injectable, inject } from 'tsyringe';
import type IUsersRepository from '@modules/users/repositories/IUsersRepository';
import type { IUser } from '@modules/users/repositories/IUsersRepository';
import type ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('CacheProvider') private cacheProvider: ICacheProvider,
  ) {}

  public async execute(userId: string): Promise<IUser[]> {
    let users = await this.cacheProvider.recover<IUser[]>(`providers-list:${userId}`);

    if (!users) {
      users = await this.usersRepository.findAllProviders(userId);
      await this.cacheProvider.save(`providers-list:${userId}`, users);
    }

    return users;
  }
}

export default ListProvidersService;
