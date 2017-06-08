'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users',  //PWs='nick',
      [
        {
          firstname: "Brady",
          lastname: "Espinosa",
          email: "brady@espinosa.com",
          createdAt:  new Date(),
          updatedAt: new Date(),
          encryptedPassword: "3319577daf01a4f86eb86b93c4435fab402b751ed4bb68d89f58b4b8a73bcc6b8b4d8072a2c742a731dc6158f82673f3094a5f04c7cf4af8bbee7ded6e927772",
          authToken: "bb38ac50-4a1d-11e7-8f1d-63d108cd14c2",
          authTokenExpiration: "2017-07-05T18:35:21.365Z",
          salt: "bb383720-4a1d-11e7-8f1d-63d108cd14c2"
        },
        {
          firstname: "Nick",
          lastname: "Bouldien",
          email: "nick@gmail.com",
          createdAt:  new Date(),
          updatedAt: new Date(),
          encryptedPassword: "16494eae63d58d8f70094917dcce75a17588961e45c6ee6f53b4ae3eac371916566e6c9dafb0efa746189e2b9216cbb4f0fcea818cfd393f7c5bd015a182fe0b",
          authToken: "f8e1cbd0-4a3c-11e7-808d-dd3bcc7fc9b",
          authTokenExpiration: "2017-07-05T18:35:21.365Z",
          salt: "f8e1a4c0-4a3c-11e7-808d-dd3bcc7fc9bf"
        },
        {
          firstname: "Antoniooo",
          lastname: "Navarro",
          email: "antoniooo@navarro.com",
          createdAt:  new Date(),
          updatedAt: new Date(),
          encryptedPassword: "467a6eceda1ffffcf4e9bade044750111b7ffe40a448addc36061fd171c401ca0f73b25083cb2e673a67edd1579714325c288b1acc97afd90fe97e360d185fa6",
          authToken: "f8e1cbd0-4a3c-11e7-808d-dd3bcc7fc9b",
          authTokenExpiration: "2017-07-05T18:35:21.365Z",
          salt: "20e90540-4c7b-11e7-a810-73866353e39a"
        }
      ]
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
