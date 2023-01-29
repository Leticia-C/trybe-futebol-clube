import { NextFunction, Request, Response } from 'express';
import IMatches from '../interfaces/IMatches';
import HttpException from '../utils/HttpException';

export default function matchesValidation(req: Request, _res: Response, next: NextFunction) {
  const { homeTeamId, awayTeamId } = req.body as IMatches;

  if (homeTeamId === awayTeamId) {
    throw new HttpException(422, 'It is not possible to create a match with two equal teams');
  }

  next();
}
