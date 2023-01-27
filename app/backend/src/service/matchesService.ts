import TeamsModel from '../database/models/TeamModel';
import MatchesModel from '../database/models/MatchesModel';
import IMatches from '../interfaces/IMatches';

export default class MatcheService {
  constructor(
    private matchesModel = MatchesModel,
  ) {
  }

  public static async awayTeamNameById(id: number) {
    const awayTeam = await TeamsModel.findByPk(id);
    return awayTeam?.teamName;
  }

  public static async homeTeamNameById(id: number) {
    const homeTeam = await TeamsModel.findByPk(id);
    return homeTeam?.teamName;
  }

  public async getAll(progress : string | undefined): Promise< IMatches[]> {
    const matches = await this.matchesModel.findAll({
      include: ([
        { model: TeamsModel,
          as: 'awayTeam',
          attributes: ['teamName'] },
        { model: TeamsModel,
          as: 'homeTeam',
          attributes: ['teamName'] },
      ]),
    });
    const going = matches.filter(({ inProgress }) => inProgress === true);
    const notGoing = matches.filter(({ inProgress }) => inProgress === false);
    if (progress === 'true') return going;
    if (progress === 'false') return notGoing;
    return matches;
  }
}
