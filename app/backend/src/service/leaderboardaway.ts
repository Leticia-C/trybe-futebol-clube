import IClassification, { ITotalPointsAndResults, ITeams,
  IGolResults } from '../interfaces/IClassification';
import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamModel';

export default class LeaderbordAwayService {
  constructor(
    private teamsModel = TeamsModel,
    private matchesModel = MatchesModel,
  ) {
  }

  public async allTeams(): Promise<ITeams[] > {
    const teams = await this.matchesModel.findAll({
      where: { inProgress: false },
      include: ([
        { model: TeamsModel,
          as: 'awayTeam',
          attributes: { include: ['id'] } },
        { model: TeamsModel,
          as: 'homeTeam',
          attributes: { include: ['id'] } },
      ]),
      attributes: { exclude: ['id', 'inProgress'] },
    }) as unknown as ITeams[];
    return teams;
  }

  public async classification():Promise<IClassification[]> {
    const classificate = await this.getAllInfo();
    classificate.sort((a, b) => b.totalPoints - a.totalPoints);
    classificate.sort((a, b) => (b.totalPoints === a.totalPoints
      ? b.totalVictories - a.totalVictories : b.totalPoints - a.totalPoints
    ));
    classificate.sort((a, b) => (b.totalPoints === a.totalPoints
         && b.totalVictories === a.totalVictories ? b.goalsBalance - a.goalsBalance
      : b.totalPoints - a.totalPoints
    ));
    classificate.sort((a, b) => (b.totalPoints === a.totalPoints
        && b.totalVictories === a.totalVictories && b.goalsBalance === a.goalsBalance
      ? b.goalsFavor - a.goalsFavor : b.totalPoints - a.totalPoints
    ));
    classificate.sort((a, b) => (b.totalPoints === a.totalPoints
        && b.totalVictories === a.totalVictories && b.goalsBalance === a.goalsBalance
        && b.goalsFavor === a.goalsFavor ? a.goalsOwn - b.goalsOwn : b.totalPoints - a.totalPoints
    ));
    return classificate;
  }

  public async getAllInfo(): Promise<IClassification[]> {
    const teams = await this.teamsModel.findAll();
    const homeTeamLeaderBord: IClassification[] = [];
    await Promise.all(teams.map(async ({ teamName, id }) => {
      const { totalPoints, totalVictories,
        totalDraws, totalLosses, efficiency, totalGames } = await this.getTotalPointsAndResuts(id);
      const { goalsBalance, goalsFavor, goalsOwn } = await this.getGols(id);
      homeTeamLeaderBord.push({ name: teamName,
        totalPoints,
        totalGames,
        totalVictories,
        totalDraws,
        totalLosses,
        goalsFavor,
        goalsOwn,
        goalsBalance,
        efficiency });
    }));
    return homeTeamLeaderBord;
  }

  public async getTotalPointsAndResuts(id: number): Promise<ITotalPointsAndResults> {
    const object = {} as ITotalPointsAndResults;
    let { totalPoints = 0, totalVictories = 0,
      totalDraws = 0, totalLosses = 0, efficiency = 0, totalGames = 0 } = object;
    const teams = await this.allTeams();
    teams.forEach(({ awayTeamGoals, homeTeamGoals, awayTeamId }, _i, arr) => {
      if (awayTeamId === id) {
        if (awayTeamGoals > homeTeamGoals) { totalPoints += 3; totalVictories += 1; }
        if (awayTeamGoals === homeTeamGoals) { totalPoints += 1; totalDraws += 1; }
        if (awayTeamGoals < homeTeamGoals) { totalPoints += 0; totalLosses += 1; }
        totalGames = arr.filter((value) => value.awayTeamId === id).length;
      }
    });
    const efficiencyCount = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
    efficiency = Number(efficiencyCount);
    return {
      totalPoints, totalVictories, totalDraws, totalLosses, totalGames, efficiency,
    };
  }

  public async getGols(id: number): Promise<IGolResults> {
    const teams = await this.allTeams();
    const object = {} as IGolResults;
    let { goalsFavor = 0, goalsOwn = 0,
      goalsBalance = 0 } = object;
    teams.forEach(({ awayTeamGoals, homeTeamGoals, awayTeamId }) => {
      if (awayTeamId === id) {
        goalsFavor += awayTeamGoals;
        goalsOwn += homeTeamGoals;
        goalsBalance = goalsFavor - goalsOwn;
      }
    });
    return { goalsFavor, goalsOwn, goalsBalance };
  }
}
