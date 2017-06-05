'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'Users',
      'email',
      {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'Users',
      'email',
      {
        type: Sequelize.STRING
      }
    )
  }
};
