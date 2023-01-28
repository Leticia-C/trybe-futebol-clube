import { NextFunction, Request, Response } from 'express';
import { veryfyToken } from '../utils/auth';

export default function loginValidation(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  veryfyToken(authorization as string);
  next();
}
