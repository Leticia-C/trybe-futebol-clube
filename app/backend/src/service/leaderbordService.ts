import IClassification, { ITotalPointsAndResults, IGolResults, ITeams }
  from '../interfaces/IClassification';
import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamModel';

export default class LeaderbordService {
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

  public async filterTeams(path: string) :Promise<IClassification[]> {
    let home: IClassification[] = [];
    let away: IClassification[] = [];
    const teamsInfo = await this.getAllInfo();
    const allTeams = await this.allTeams();
    allTeams.forEach((value) => {
      home = teamsInfo.filter(({ name }) => name === value.homeTeam.teamName);
      away = teamsInfo.filter(({ name }) => name === value.awayTeam.teamName);
    });
    if (path === 'home') return home;
    if (path === 'away') return away;
    return teamsInfo;
  }

  public async classification(path: string):Promise<IClassification[]> {
    const classificate = await this.filterTeams(path);
    classificate.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor || a.goalsOwn - b.goalsOwn);
    return classificate;
  }

  public async getAllInfo(): Promise<IClassification[]> {
    const teams = await this.teamsModel.findAll();
    const homeTeamLeaderBord: IClassification[] = [];
    await Promise.all(teams.map(async ({ teamName, id }) => {
      const { totalPoints, totalVictories, totalDraws } = await this.getAllPoints(id);
      const { goalsBalance, goalsFavor, goalsOwn } = await this.getGols(id);
      const totalGames = await this.getAllGames(id);
      homeTeamLeaderBord.push({ name: teamName,
        totalPoints,
        totalGames,
        totalVictories,
        totalDraws,
        totalLosses: (totalGames - (totalVictories + totalDraws)),
        goalsFavor,
        goalsOwn,
        goalsBalance,
        efficiency: Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2)) });
    }));
    return homeTeamLeaderBord;
  }

  public async getAllPoints(id: number): Promise<ITotalPointsAndResults> {
    const object = {} as ITotalPointsAndResults;
    let { totalPoints = 0, totalVictories = 0,
      totalDraws = 0 } = object;
    const teams = await this.allTeams();
    teams.forEach(async ({ awayTeamGoals, homeTeamGoals, awayTeamId, homeTeamId }) => {
      if (awayTeamId === id) {
        if (awayTeamGoals > homeTeamGoals) { totalPoints += 3; totalVictories += 1; }
        if (awayTeamGoals === homeTeamGoals) { totalPoints += 1; totalDraws += 1; }
      }
      if (homeTeamId === id) {
        if (awayTeamGoals < homeTeamGoals) { totalPoints += 3; totalVictories += 1; }
        if (awayTeamGoals === homeTeamGoals) { totalPoints += 1; totalDraws += 1; }
      }
    });
    return { totalPoints, totalVictories, totalDraws };
  }

  public async getGols(id: number): Promise<IGolResults> {
    const teams = await this.allTeams();
    const object = {} as IGolResults;
    let { goalsFavor = 0, goalsOwn = 0,
      goalsBalance = 0 } = object;
    teams.forEach(({ awayTeamGoals, homeTeamGoals, awayTeamId, homeTeamId }) => {
      if (awayTeamId === id) {
        goalsFavor += awayTeamGoals;
        goalsOwn += homeTeamGoals;
        goalsBalance = goalsFavor - goalsOwn;
      }
      if (homeTeamId === id) {
        goalsFavor += homeTeamGoals;
        goalsOwn += awayTeamGoals;
        goalsBalance = goalsFavor - goalsOwn;
      }
    });
    return { goalsFavor, goalsOwn, goalsBalance };
  }

  public async getAllGames(id: number):Promise<number> {
    let totalGames = 0;
    const teams = await this.allTeams();
    totalGames = teams
      .filter((games) => id === games.homeTeamId || id === games.awayTeamId).length;
    return totalGames;
  }
}
