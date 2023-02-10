import { Request, Response } from 'express';
import LeaderbordAwayService from '../service/leaderboardaway';
import LeaderboardHomeService from '../service/leaderbordHomeServece';
import LeaderbordService from '../service/leaderbordService';

export default class LeaderbordController {
  public leaderboardHomeService: LeaderboardHomeService ;
  public leaderboardAwayService : LeaderbordAwayService;
  public leaderbordService: LeaderbordService;
  constructor() {
    this.leaderboardHomeService = new LeaderboardHomeService();
    this.leaderboardAwayService = new LeaderbordAwayService();
    this.leaderbordService = new LeaderbordService();
  }

  async getHomeTeamsMatches(_req: Request, res: Response) {
    const teams = await this.leaderbordService.classification('home');
    return res.status(200).json(teams);
  }

  async getAwayTeamsMatches(_req: Request, res: Response) {
    const teams = await this.leaderbordService.classification('away');
    return res.status(200).json(teams);
  }

  async getAllTeamsMatches(_req: Request, res: Response) {
    const teams = await this.leaderbordService.classification('');
    return res.status(200).json(teams);
  }
}
