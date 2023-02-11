import { teamAwayQuery, teamHomeQuery } from '../utils/leaderboardQueries';
import IClassification from '../interfaces/IClassification';
import sequelize from '../database/models/index';

export default class LeaderbordAllTeamsService {
  constructor(
    private Sequelize = sequelize,
  ) {
  }

  public async allMatches(): Promise<IClassification[]> {
    const [homeTeams] = await this.Sequelize.query(teamHomeQuery);
    const [awayTeams] = await this.Sequelize.query(teamAwayQuery);
    const allTeams = [] as IClassification[];
    for (let i = 0; i < homeTeams.length; i += 1) {
      const homeTeam = homeTeams[i] as IClassification;
      for (let j = 0; j < awayTeams.length; j += 1) {
        const awayTeam = awayTeams[j] as IClassification;
        if (homeTeam.name === awayTeam.name) {
          allTeams.push(
            LeaderbordAllTeamsService.calculateScore(homeTeam, awayTeam),
          );
        }
      }
    }
    return LeaderbordAllTeamsService.calculatePositions(allTeams);
  }

  static calculateScore(homeTeam: IClassification, awayTeam: IClassification): IClassification {
    const totalPoints = Number(homeTeam.totalPoints) + Number(awayTeam.totalPoints);
    const totalGames = Number(homeTeam.totalGames) + Number(awayTeam.totalGames);
    const efficiencyCount = (totalPoints / (totalGames * 3)) * 100;
    return {
      name: homeTeam.name,
      totalPoints,
      totalGames,
      totalVictories: Number(homeTeam.totalVictories)
      + Number(awayTeam.totalVictories),
      totalDraws: Number(homeTeam.totalDraws) + Number(awayTeam.totalDraws),
      totalLosses: Number(homeTeam.totalLosses) + Number(awayTeam.totalLosses),
      goalsFavor: Number(homeTeam.goalsFavor) + Number(awayTeam.goalsFavor),
      goalsOwn: Number(homeTeam.goalsOwn) + Number(awayTeam.goalsOwn),
      goalsBalance:
        Number(homeTeam.goalsBalance) + Number(awayTeam.goalsBalance),
      efficiency: Number(efficiencyCount.toFixed(2)),
    };
  }

  static calculatePositions(allMatches: IClassification[]): IClassification[] {
    return allMatches.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor || a.goalsOwn - b.goalsOwn);
  }

  public async AllAwayTeams(): Promise<IClassification[] > {
    const [awayTeams] = await this.Sequelize.query(teamAwayQuery);
    return awayTeams as IClassification[];
  }

  public async AllHomeTeams(): Promise<IClassification[] > {
    const [homeTeams] = await this.Sequelize.query(teamHomeQuery);
    return homeTeams as IClassification[];
  }
}
