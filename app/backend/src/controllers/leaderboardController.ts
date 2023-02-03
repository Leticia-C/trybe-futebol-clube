import { Request, Response } from 'express';
import LeaderbordService from '../service/leaderbordServece';

export default class LeaderbordController {
  public leaderboardService: LeaderbordService;
  constructor() {
    this.leaderboardService = new LeaderbordService();
  }

  async getHomeMatches(_req: Request, res: Response) {
    const teams = await this.leaderboardService.classification();
    return res.status(200).json(teams);
  }
}
