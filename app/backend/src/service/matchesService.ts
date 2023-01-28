import IMatches, { IChangeGols } from '../interfaces/IMatches';
import HttpException from '../utils/HttpException';
import TeamsModel from '../database/models/TeamModel';
import MatchesModel from '../database/models/MatchesModel';

export default class MatcheService {
  constructor(
    private matchesModel = MatchesModel,
    public readonly mensageNotFound = 'There is no team with such id!',
    public readonly equalId = 'It is not possible to create a match with two equal teams',
  ) { }

  public async postNewMach(newMatch: IMatches): Promise<IMatches | undefined> {
    const matches = await this.matchesModel
      .create({ ...newMatch, inProgress: true });
    const { awayTeamId, homeTeamId } = matches;
    if (awayTeamId === homeTeamId) throw new HttpException(422, this.equalId);
    return matches as IMatches;
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
}
