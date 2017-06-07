'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Jobs', 'userId', {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
      model: 'Users',
        key: 'id',
        as: 'userId'
     }
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Jobs');
  }
};
