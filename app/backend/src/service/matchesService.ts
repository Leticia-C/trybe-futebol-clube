import IMatches, { IChangeGols } from '../interfaces/IMatches';
import HttpException from '../utils/HttpException';
import TeamsModel from '../database/models/TeamModel';
import MatchesModel from '../database/models/MatchesModel';
import { ITeams } from '../interfaces/IClassification';

export default class MatcheService {
  constructor(
    private matchesModel = MatchesModel,
    public readonly mensageNotFound = 'There is no team with such id!',
  ) { }

  public async postNewMach(newMatch: IMatches): Promise<IMatches | undefined> {
    try {
      const matches = await this.matchesModel.create({ ...newMatch, inProgress: true });
      return matches as IMatches;
    } catch (err) {
      throw new HttpException(404, this.mensageNotFound);
    }
  }

  public async getAll(progress : string | undefined): Promise< IMatches[]> {
    const matches = await this.matchesModel.findAll({ include: ([
      { model: TeamsModel, as: 'awayTeam', attributes: ['teamName'] },
      { model: TeamsModel, as: 'homeTeam', attributes: ['teamName'] },
    ]),
    });
    const going = matches.filter(({ inProgress }) => inProgress === true);
    const notGoing = matches.filter(({ inProgress }) => inProgress === false);
    if (progress === 'true') return going;
    if (progress === 'false') return notGoing;
    return matches;
  }

  public async changeMaches(id: number): Promise<void> {
    await this.matchesModel.update(
      { inProgress: false },
      { where: { id } },
    );
  }

  public async changeGols({ homeTeamGoals, awayTeamGoals }:
  IChangeGols, id: number): Promise<void> {
    await this.matchesModel.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
  }

  public async allTeams(): Promise<ITeams[] > {
    const teams = await this.matchesModel.findAll({
      where: { inProgress: true },
      include: ([
        { model: TeamsModel,
          as: 'awayTeam',
          attributes: { exclude: ['id'] } },
        { model: TeamsModel,
          as: 'homeTeam',
          attributes: { exclude: ['id'] } },
      ]),
      attributes: { exclude: ['id', 'inProgress', 'awayTeamId', 'homeTeamId'] },
    }) as unknown as ITeams[];
    return teams;
  }
}
