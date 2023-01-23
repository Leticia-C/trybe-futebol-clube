import { Request, Response } from 'express';
import { ILogin } from '../interfaces/IUsers';
import login from '../service/login-service';
import createToken from '../utils/auth';

export default async function doLogin(req: Request, res: Response) {
  const { email, password } = req.body as ILogin;
  const user = await login({ email, password });
  const token = createToken(user);
  return res.status(200).json({ token });
}
