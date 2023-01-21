import { Model, STRING, INTEGER } from "sequelize";
import db from ".";
import Matches from "./MatchesModel";

export default class Teams extends Model {
  declare id: number;
  declare username: string;
}

Teams.init(
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
    modelName: "teams",
    timestamps: false,
  }
);

/**
 * `Workaround` para aplicar as associations em TS:
 * Associations 1:N devem ficar em uma das instâncias de modelo
 * */

Teams.belongsTo(Matches, { foreignKey: "homeTeamId", as: "home_team_id" });
Teams.belongsTo(Matches, { foreignKey: "awayTeamId", as: "away_team_id" });

Matches.hasMany(Teams, { foreignKey: "id", as: "home_team_id" });
Matches.hasMany(Teams, { foreignKey: "id", as: "away_team_id" });
