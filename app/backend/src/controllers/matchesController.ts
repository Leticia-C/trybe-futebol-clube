import { Request, Response } from 'express';
import MatchesService from '../service/matchesService';
import { veryfyToken } from '../utils/auth';

export default class TeamController {
  public matchesService: MatchesService;
  constructor() {
    this.matchesService = new MatchesService();
  }

  async getMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const matches = await this.matchesService.getAll(inProgress as string | undefined);
    return res.status(200).json(matches);
  }

  async creareNewMatches(req: Request, res: Response) {
    const { body } = req;
    const token = req.header('authorization');
    if (!token || !veryfyToken(token as string)) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    const matches = await this.matchesService.postNewMach(body);
    return res.status(201).json(matches);
  }
}
