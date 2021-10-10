module.exports = {
    up: async (queryInterface, Sequelize) => {
      let transaction = await queryInterface.sequelize.transaction()
      try {
        await queryInterface.createTable('common_auth_token', {
          id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          auth: {
            type: Sequelize.STRING(50),
            allowNull: false,
            references: {
              model: 'common_auth',
              key: 'username',
            },
          },
          active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
          },
          token: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          createdAt: {
            type: Sequelize.DATE,
            field: 'created_at',
          },
        }, { transaction })
        await transaction.commit()    
      } catch(err) {
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
  }