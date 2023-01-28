import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/HttpException';
import { veryfyToken } from '../utils/auth';

export default function loginValidation(req: Request, _res: Response, next: NextFunction) {
  const token = req.headers.authorization || '';
  if (!token) throw new HttpException(401, 'Token not found');
  try {
    veryfyToken(token as string);
  } catch (error) {
    throw new HttpException(401, 'Token must be a valid token');
  }
  next();
}
