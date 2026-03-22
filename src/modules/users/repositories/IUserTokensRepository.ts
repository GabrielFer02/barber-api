export interface IUserToken {
  id: string;
  token: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export default interface IUserTokensRepository {
  generate(userId: string): Promise<IUserToken>;
  findByToken(token: string): Promise<IUserToken | undefined>;
}
