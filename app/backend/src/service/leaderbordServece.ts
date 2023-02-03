import IClassification, { ITotalPointsAndResults, ITeams,
  IGolResults } from '../interfaces/IClassification';
import TeamsModel from '../database/models/TeamModel';
import MatchesModel from '../database/models/MatchesModel';

export default class LeaderbordService {
  constructor(
    private matchesModel = MatchesModel,
  ) { }

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

  public async getDuplicate():Promise<IClassification[]> {
    const set = new Set();
    const allTeams = await this.getAllInfo();
    const classificate = allTeams.filter((name) => {
      const duplicated = set.has(name.name);
      set.add(name.name);
      return !duplicated;
    });
    return classificate;
  }

  public async classification():Promise<IClassification[]> {
    const withoutDuplicate = await this.getDuplicate();
    const classificate = withoutDuplicate.sort((a, b) => b.totalPoints - a.totalPoints);
    classificate.sort((a, b) => (b.totalPoints === a.totalPoints
      ? b.totalVictories - a.totalVictories : b.totalPoints - a.totalPoints
    ));
    classificate.sort((a, b) => (b.totalPoints === a.totalPoints
       && b.totalVictories === a.totalVictories ? b.goalsFavor - a.goalsFavor
      : b.totalPoints - a.totalPoints
    ));
    classificate.sort((a, b) => (b.totalPoints === a.totalPoints
      && b.totalVictories === a.totalVictories && b.goalsFavor === a.goalsBalance
      ? a.totalLosses - b.totalLosses : b.totalPoints - a.totalPoints
    ));
    return classificate;
  }

  public async getAllInfo(): Promise<IClassification[]> {
    const teams = await this.allTeams();
    const homeTeamLeaderBord: IClassification[] = [];
    await Promise.all(teams.map(async ({ homeTeam: { teamName, id } }) => {
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
    teams.forEach(({ awayTeamGoals, homeTeamGoals, homeTeamId }, _i, arr) => {
      if (homeTeamId === id) {
        if (awayTeamGoals < homeTeamGoals) { totalPoints += 3; totalVictories += 1; }
        if (awayTeamGoals === homeTeamGoals) { totalPoints += 1; totalDraws += 1; }
        if (awayTeamGoals > homeTeamGoals) { totalLosses += 1; }
        totalGames = arr.filter((value) => value.homeTeamId === id).length;
      }
    });
    const efficiencyCount = ((totalPoints / (totalGames * 3)) * 100);
    efficiency = Number(efficiencyCount.toFixed(2));
    return {
      totalPoints, totalVictories, totalDraws, totalLosses, totalGames, efficiency,
    };
  }

  public async getGols(id: number): Promise<IGolResults> {
    const teams = await this.allTeams();
    const object = {} as IGolResults;
    let { goalsFavor = 0, goalsOwn = 0,
      goalsBalance = 0 } = object;
    teams.forEach(({ awayTeamGoals, homeTeamGoals, homeTeamId }) => {
      if (homeTeamId === id) {
        goalsFavor += homeTeamGoals;
        goalsOwn += awayTeamGoals;
        goalsBalance = goalsFavor - goalsOwn;
      }
    });
    return { goalsFavor, goalsOwn, goalsBalance };
  }
}
