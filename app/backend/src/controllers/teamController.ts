import { Request, Response } from 'express';
import TeamService from '../service/teamService';

export default class TeamController {
  public teamService: TeamService;
  constructor() {
    this.teamService = new TeamService();
  }

  async getallTeams(_req: Request, res: Response) {
    const teams = await this.teamService.getAll();
    return res.status(200).json(teams);
  }

  async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const teams = await this.teamService.getbyId(Number(id));
    return res.status(200).json(teams);
  }
}
