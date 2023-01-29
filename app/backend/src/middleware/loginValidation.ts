import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/HttpException';

export default function loginValidation(req: Request, _res: Response, next: NextFunction) {
  const { email, password } = req.body;

  if (!email) {
    throw new HttpException(400, 'All fields must be filled');
  }
  if (!password) throw new HttpException(400, 'All fields must be filled');

  next();
}
