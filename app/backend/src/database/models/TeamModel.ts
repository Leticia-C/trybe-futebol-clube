import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';
import Matches from './MatchesModel';

export default class TeamsModel extends Model {
  declare id: number;
  declare username: string;
}

TeamsModel.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    teamName: {
      type: STRING,
      allowNull: false,
    }, // ... Campos
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'teams',
    timestamps: false,
  },
);

TeamsModel.belongsTo(Matches, { foreignKey: 'homeTeamId', as: 'home_team_id' });
TeamsModel.belongsTo(Matches, { foreignKey: 'awayTeamId', as: 'away_team_id' });

Matches.hasMany(TeamsModel, { foreignKey: 'id', as: 'home_team_id' });
Matches.hasMany(TeamsModel, { foreignKey: 'id', as: 'away_team_id' });
