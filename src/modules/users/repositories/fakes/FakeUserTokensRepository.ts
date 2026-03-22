import { v4 as uuid } from 'uuid';
import IUserTokensRepository, { IUserToken } from '../IUserTokensRepository';

class FakeUserTokensRepository implements IUserTokensRepository {
  private tokens: IUserToken[] = [];

  public async generate(userId: string): Promise<IUserToken> {
    const userToken: IUserToken = {
      id: uuid(),
      token: uuid(),
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.tokens.push(userToken);
    return userToken;
  }

  public async findByToken(token: string): Promise<IUserToken | undefined> {
    return this.tokens.find(t => t.token === token);
  }
}

export default FakeUserTokensRepository;
