import { Request, Response } from 'express';
import { ILogin } from '../interfaces/IUsers';
import LoginService from '../service/loginService';
import createToken from '../utils/auth';

export default class LoginController {
  constructor(private loginService : LoginService) {
  }

  async doLogin(req: Request, res: Response) {
    try {
      const { email, password } = req.body as ILogin;
      const user = await this.loginService.login({ email, password });
      const token = createToken(user);
      return res.status(200).json({ token });
    } catch (error) {
      res.status(500).send({ mensage: error });
    }
  }
}
