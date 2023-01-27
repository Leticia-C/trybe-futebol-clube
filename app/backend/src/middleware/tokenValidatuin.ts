import { NextFunction, Request, Response } from 'express';

export default async function TokenValidation(req: Request, res: Response, next: NextFunction) {
  const token = req.header('authorization');
  if (!token) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  next();
}
