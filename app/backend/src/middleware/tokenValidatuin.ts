import { NextFunction, Request, Response } from 'express';
import { veryfyToken } from '../utils/auth';

export default async function TokenValidation(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  if (!token || !veryfyToken(token as string)) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  next();
}
