import { eq } from 'drizzle-orm';
import { db } from '@shared/infra/drizzle/client';
import { userTokens } from '@shared/infra/drizzle/schema';
import IUserTokensRepository, { IUserToken } from '@modules/users/repositories/IUserTokensRepository';

class DrizzleUserTokensRepository implements IUserTokensRepository {
  public async generate(userId: string): Promise<IUserToken> {
    const [token] = await db.insert(userTokens).values({ userId }).returning();
    return token;
  }

  public async findByToken(token: string): Promise<IUserToken | undefined> {
    const [userToken] = await db.select().from(userTokens).where(eq(userTokens.token, token));
    return userToken || undefined;
  }
}

export default DrizzleUserTokensRepository;
