import IUsers, { ILogin } from '../interfaces/IUsers';
import UsersModel from '../database/models/UserModel';

export default class LoginService {
  constructor(private userModel = UsersModel) {
  }

  async getRole(id : number): Promise<string | undefined> {
    const user = await this.userModel.findByPk(id);
    if (user) return user?.role;
  }

  async login({ email } : ILogin): Promise<IUsers | null> {
    const user = await this.userModel.findOne({ where: { email } });
    if (user) {
      return {
        id: user.id,
        username: user.username,
      } as IUsers;
    }
    return null;
  }
}
