import TeamsModel from '../database/models/TeamModel';
import MatchesModel from '../database/models/MatchesModel';
import IMatches from '../interfaces/IMatches';

export default class MatcheService {
  constructor(
    private matchesModel = MatchesModel,
  ) {
  }

  public async postNewMach(newMatch: IMatches): Promise<IMatches | undefined> {
    const matches = await this.matchesModel.create({
      ...newMatch,
      inProgress: true,
    });
    return matches as IMatches;
  }

  /*  public async finishMachById(id: number): Promise<void > {
    const matches = await this.matchesModel.update({});
  } */

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
