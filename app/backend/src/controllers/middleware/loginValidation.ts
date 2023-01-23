import { NextFunction, Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import LoginService from '../../service/loginService';

export default async function loginValidation(req: Request, res: Response, next: NextFunction) {
  const loginService = new LoginService();
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  const user = await loginService.login({ email, password });
  if (user === null) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  const passwordCrypt = await bcrypt.compare(req.body.password, user.password);
  if (passwordCrypt === false) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  next();
}
