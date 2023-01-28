export default interface IMatches {
  id?: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface IChangeGols {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface ITeamsId {
  awayTeamId: number,
  homeTeamId: number,
}
