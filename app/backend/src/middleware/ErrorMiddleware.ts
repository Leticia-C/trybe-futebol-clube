import { Request, Response, NextFunction } from 'express';
import HttpException from '../utils/HttpException';

function ErrorMiddleware(error: Error, _req: Request, res: Response, _next: NextFunction) {
  const { status, message } = error as HttpException;
  res.status(status || 500).json({ message });
}

export default ErrorMiddleware;
