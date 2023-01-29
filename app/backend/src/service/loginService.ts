import * as Bcrypt from 'bcryptjs';
import IUsers, { ILogin } from '../interfaces/IUsers';
import UsersModel from '../database/models/UserModel';
import HttpException from '../utils/HttpException';

export default class LoginService {
  constructor(private userModel = UsersModel) {
  }

  async getRole(id : number): Promise<string | undefined> {
    const user = await this.userModel.findByPk(id);
    if (user) return user?.role;
  }

  async login({ email, password } : ILogin): Promise<IUsers | undefined> {
    const user = await this.userModel.findOne({ where: { email } });
    console.log(email, password);
    if (!email && !password) {
      throw new HttpException(400, 'All fields must be filled');
    }
    if (!user) {
      throw new HttpException(401, 'Incorrect email or password');
    }
    if (user
       && Bcrypt.compareSync(password as string, user.password)) {
      return {
        id: user.id,
        username: user.username,
      } as IUsers;
    }
    throw new HttpException(401, 'Incorrect email or password');
  }
}
