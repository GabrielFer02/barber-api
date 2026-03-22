import { eq, ne } from 'drizzle-orm';
import { db } from '@shared/infra/drizzle/client';
import { users } from '@shared/infra/drizzle/schema';
import IUsersRepository, { ICreateUserDTO, IUser } from '@modules/users/repositories/IUsersRepository';

class DrizzleUsersRepository implements IUsersRepository {
  public async findById(id: string): Promise<IUser | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  public async findAllProviders(exceptUserId?: string): Promise<IUser[]> {
    if (exceptUserId) {
      return db.select().from(users).where(ne(users.id, exceptUserId));
    }
    return db.select().from(users);
  }

  public async create(data: ICreateUserDTO): Promise<IUser> {
    const [user] = await db.insert(users).values(data).returning();
    return user;
  }

  public async save(user: IUser): Promise<IUser> {
    const [updated] = await db
      .update(users)
      .set({ name: user.name, email: user.email, password: user.password, avatar: user.avatar, updatedAt: new Date() })
      .where(eq(users.id, user.id))
      .returning();
    return updated;
  }
}

export default DrizzleUsersRepository;
