'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
         'Users',
         'imageUrl',
         Sequelize.STRING
       )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
          'Users',
          'imageUrl'
        )
  }
};
