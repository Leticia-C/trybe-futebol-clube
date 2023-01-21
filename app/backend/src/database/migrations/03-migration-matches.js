module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("matches", {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      homeTeamId: {
        type: Sequelize.INTEGER,
        field: "home_team_id",
        references: {
          model: "teams",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      homeTeamGoals: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "home_team_goals",
      },
      awayTeamId: {
        type: Sequelize.INTEGER,
        field: "away_team_id",
        references: {
          model: "teams",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      awayTeamGoals: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "away_team_goals",
      },
      inProgress: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: "in_progress",
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("matches");
  },
};
