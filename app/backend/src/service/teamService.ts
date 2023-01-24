import ITeam from '../interfaces/ITeam';
import TeamModel from '../database/models/TeamModel';

export default class TeamService {
  constructor(private teamModel = TeamModel) {
  }

  public async getAll(): Promise<TeamModel[]> {
    const team = await this.teamModel.findAll();
    return team;
  }

  public async getbyId(id: number): Promise<ITeam | undefined> {
    const team = await this.teamModel.findByPk(id);
    return team as ITeam;
  }
}
