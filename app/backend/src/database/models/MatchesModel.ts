import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import TeamsModel from './TeamModel';

export default class MatchesModel extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchesModel.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

TeamsModel.belongsTo(MatchesModel, { foreignKey: 'homeTeamId', as: 'home_team_id' });
TeamsModel.belongsTo(MatchesModel, { foreignKey: 'awayTeamId', as: 'away_team_id' });

MatchesModel.hasMany(TeamsModel, { foreignKey: 'id', as: 'home_team_id' });
MatchesModel.hasMany(TeamsModel, { foreignKey: 'id', as: 'away_team_id' });
