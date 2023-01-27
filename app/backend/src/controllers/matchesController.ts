import { Request, Response } from 'express';
import MatchesService from '../service/matchesService';

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
    const matches = await this.matchesService.postNewMach(body);
    return res.status(201).json(matches);
  }
}
