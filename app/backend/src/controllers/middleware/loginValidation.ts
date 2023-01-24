import { NextFunction, Request, Response } from 'express';

export default async function loginValidation(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (!password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  next();
}
