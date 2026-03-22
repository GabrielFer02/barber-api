import { v4 as uuid } from 'uuid';
import IUsersRepository, { ICreateUserDTO, IUser } from '../IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private users: IUser[] = [];

  public async findById(id: string): Promise<IUser | undefined> {
    return this.users.find(user => user.id === id);
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    return this.users.find(user => user.email === email);
  }

  public async findAllProviders(exceptUserId?: string): Promise<IUser[]> {
    if (exceptUserId) {
      return this.users.filter(user => user.id !== exceptUserId);
    }
    return this.users;
  }

  public async create(data: ICreateUserDTO): Promise<IUser> {
    const user: IUser = {
      id: uuid(),
      ...data,
      avatar: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(user);
    return user;
  }

  public async save(user: IUser): Promise<IUser> {
    const index = this.users.findIndex(u => u.id === user.id);
    this.users[index] = user;
    return user;
  }
}

export default FakeUsersRepository;
