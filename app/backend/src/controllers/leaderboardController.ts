import { Request, Response } from 'express';
import LeaderbordAwayService from '../service/leaderboardaway';
import LeaderboardHomeService from '../service/leaderbordHomeServece';
import LeaderbordAllTeamsService from '../service/leaderboradAllTeams';

export default class LeaderbordController {
  public leaderboardHomeService: LeaderboardHomeService ;
  public leaderboardAwayService : LeaderbordAwayService;
  public leaderbordAllTeamsService: LeaderbordAllTeamsService;
  constructor() {
    this.leaderboardHomeService = new LeaderboardHomeService();
    this.leaderboardAwayService = new LeaderbordAwayService();
    this.leaderbordAllTeamsService = new LeaderbordAllTeamsService();
  }

  async getHomeTeamsMatches(_req: Request, res: Response) {
    const teams = await this.leaderboardHomeService.classification();
    return res.status(200).json(teams);
  }

  async getAwayTeamsMatches(_req: Request, res: Response) {
    const teams = await this.leaderboardAwayService.classification();
    return res.status(200).json(teams);
  }

  async getAllTeamsMatches(_req: Request, res: Response) {
    const teams = await this.leaderbordAllTeamsService.classification();
    return res.status(200).json(teams);
  }
}
