import IUsers, { ILogin } from '../interfaces/IUsers';
import UsersModel from '../database/models/UserModel';

export default async function login({ email, password } : ILogin): Promise<IUsers | null> {
  const response = await UsersModel.findOne({ where: { email, password } });
  return response;
}
