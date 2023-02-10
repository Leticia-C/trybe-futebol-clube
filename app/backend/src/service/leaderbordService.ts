import { teamAwayQuery, teamHomeQuery, awayAndHomeTeamsQuery } from '../utils/leaderboardQueries';
import MatchesModel from '../database/models/MatchesModel';
import IClassification from '../interfaces/IClassification';
import sequelize from '../database/models/index';

export default class LeaderbordAllTeamsService {
  constructor(
    private matchesModel = MatchesModel,
    private Sequelize = sequelize,
  ) {
  }

  public async allMatches(): Promise<IClassification[]> {
    const awayAndHomeTeams = await this.Sequelize.query(awayAndHomeTeamsQuery);
    return awayAndHomeTeams as IClassification[];
  }

  public async AllAwayTeams(): Promise<IClassification[] > {
    const awayTeams = await this.matchesModel.sequelize?.query(teamAwayQuery);
    return awayTeams as IClassification[];
  }

  public async AllHomeTeams(): Promise<IClassification[] > {
    const homeTeams = await this.Sequelize.query(teamHomeQuery);
    return homeTeams as IClassification[];
  }
}
