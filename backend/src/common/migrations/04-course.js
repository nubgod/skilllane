'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let transaction = await queryInterface.sequelize.transaction()
        try {
            await queryInterface.createTable('course', {
                id: {
                    type: Sequelize.BIGINT,
                    autoIncrement: true,
                    allowNull: false,
                    primaryKey: true,
                },
                name: {
                    type: Sequelize.STRING(255),
                    field: 'name',
                },
                subject: {
                    type: Sequelize.STRING(255),
                    field: 'subject',
                },
                description: {
                    type: Sequelize.TEXT,
                    field: 'description',
                },
                category: {
                    type: Sequelize.STRING(255),
                    field: 'category',
                },
                image: {
                    type: Sequelize.TEXT,
                    field: 'image',
                },
                startDate: {
                    type: Sequelize.DATE,
                    field: 'start_date',
                },
                endDate: {
                    type: Sequelize.DATE,
                    field: 'end_date',
                },
                createdBy: {
                    type: Sequelize.STRING(255),
                    field: 'created_by',
                    allowNull: false,
                    references: {
                        model: 'common_auth',
                        key: 'username',
                    },
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
