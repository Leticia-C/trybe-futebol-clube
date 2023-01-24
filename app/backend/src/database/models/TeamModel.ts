import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';

export default class TeamsModel extends Model {
  declare id: number;
  declare teamName: string;
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
