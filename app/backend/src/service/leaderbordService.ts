import IClassification from '../interfaces/IClassification';
import MatchesModel from '../database/models/MatchesModel';
import { teamHomeQuery, teamAwayQuery, awayAndHomeTeamsQuery } from '../utils/leaderboardQueries';

export default class LeaderbordService {
  constructor(
    private matchesModel = MatchesModel,
  ) {
  }

  public async allMatches(): Promise<IClassification[]> {
    const awayAndHomeTeams = await this.matchesModel.sequelize?.query(awayAndHomeTeamsQuery);
    return awayAndHomeTeams as IClassification[];
  }

  public async AllHomeTeams(): Promise<IClassification[] > {
    const homeTeams = await this.matchesModel.sequelize?.query(teamHomeQuery);
    return homeTeams as IClassification[];
  }

  public async AllAwayTeams(): Promise<IClassification[] > {
    const awayTeams = await this.matchesModel.sequelize?.query(teamAwayQuery);
    return awayTeams as IClassification[];
  }
}
