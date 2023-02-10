import { Request, Response } from 'express';
import LeaderbordService from '../service/leaderbordService';

export default class LeaderbordController {
  public leaderbordService: LeaderbordService;
  constructor() {
    this.leaderbordService = new LeaderbordService();
  }

  async getHomeTeamsMatches(_req: Request, res: Response) {
    const [teams] = await this.leaderbordService.AllHomeTeams();
    return res.status(200).json(teams);
  }

  async getAwayTeamsMatches(_req: Request, res: Response) {
    const [teams] = await this.leaderbordService.AllAwayTeams();
    return res.status(200).json(teams);
  }

  async getAllTeamsMatches(_req: Request, res: Response) {
    const [teams] = await this.leaderbordService.allMatches();
    return res.status(200).json(teams);
  }
}
