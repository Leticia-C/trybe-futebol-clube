import { Request, Response } from 'express';
import { ILogin } from '../interfaces/IUsers';
import LoginService from '../service/loginService';
import createToken from '../utils/auth';

export default class LoginController {
  public loginService: LoginService;
  constructor() {
    this.loginService = new LoginService();
  }

  async doLogin(req: Request, res: Response) {
    const { email } = req.body as ILogin;
    const user = await this.loginService.login({ email });

    if (user === null) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    const token = createToken(user);
    return res.status(200).json({ token });
  }
}
