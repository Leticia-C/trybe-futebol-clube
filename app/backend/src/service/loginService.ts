import IUsers, { ILogin } from '../interfaces/IUsers';
import UsersModel from '../database/models/UserModel';

export default class LoginService {
  constructor(private userModel = UsersModel) {
  }

  async login({ email, password } : ILogin): Promise<IUsers | null> {
    const response = await this.userModel.findOne({ where: { email, password } });
    return response;
  }
}
