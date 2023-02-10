export default interface IClassification {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
}

export interface ITeamsMatches {
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  awayTeam: {
    id: number,
    teamName: string
  },
  homeTeam: {
    id: number,
    teamName: string
  },
}

export interface ITotalPointsAndResults {
  totalPoints: number,
  totalVictories: number,
  totalDraws: number,
}

export interface IGolResults {
  goalsFavor: number,
  goalsOwn: number,
}

export interface ITotalsGamesAndPath {
  totalGames: number,
  path: string,
}
