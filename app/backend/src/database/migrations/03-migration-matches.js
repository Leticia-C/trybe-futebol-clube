/* module.exports = {
  up: async (queryInterface,
      Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false
      },
      homeTeamId: {
        type: Sequelize.INTEGER,
        field: 'home_team_id',
        references: {
          model: 'teams',
          as: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      role: {
          type: Sequelize.STRING,
          allowNull: false
      },
      awayTeamsGoals: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field:  'away_teams_goals'
      },
      inProgress: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          field: 'in_progress',
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('matches');
  }
} */
