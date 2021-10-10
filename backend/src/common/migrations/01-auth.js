'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('common_auth', {
        username: {
          type: Sequelize.STRING(50),
          allowNull: false,
          primaryKey: true,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        role: {
          type: Sequelize.ENUM('student', 'instructor'),
          allowNull: false,
        },
        isLocked: {
          type: Sequelize.BOOLEAN,
          field: 'is_locked',
          defaultValue: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: 'created_at',
        },
      }, { transaction })
      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
