'use strict';

let User = require('../models').User

module.exports = {
  up: function (queryInterface, Sequelize) {
    return User.findAll().then(function(users){ // returns a promise
      let jobPromises = users.map(function(user){
        console.log(user);
        return queryInterface.bulkInsert('Jobs',
        [
          {
            id:1,
            company: "Google",
            jobTitle: "Web Developer",
            city: "Mountain View",
            status: "Interviewed",
            date: "2017-06-04",
            url: "www.google.com",
            notes: "Spoke with hiring manager at JavaScript meetup in March",
            userId: 25,
            createdAt:  "2017-07-05T18:35:21.365Z",
            updatedAt: "2017-07-05T18:35:21.365Z"
          },
          {
            id:2,
            company: "Apple",
            jobTitle: "Engineer II",
            city: "Cupertino",
            status: "Applied",
            date: "2017-06-04",
            url: "www.apple.com",
            notes: "Had coffee with Jim, the engineering manager in mid May. He thought I'd be a good fit for the role.",
            userId: 25,
            createdAt:  "2017-07-05T18:35:21.365Z",
            updatedAt: "2017-07-05T18:35:21.365Z"
          },
          {
            id:3,
            company: "Facebook",
            jobTitle: "Software Engineer I",
            city: "Palo Alto",
            status: "Applied",
            date: "2017-06-02",
            url: "www.facebook.com",
            notes: "Facebook corporate headhunting reached out to me about applying for the job",
            userId: 26,
            createdAt:  "2017-07-05T18:35:21.365Z",
            updatedAt: "2017-07-05T18:35:21.365Z"
          },
          {
            id:4,
            company: "Qualcomm",
            jobTitle: "Software Engineer II",
            city: "San Diego",
            status: "Applied",
            date: "2017-06-01",
            url: "www.qualcomm.com",
            notes: "Volunteered at the tech conference and met Alvin, the hiring manager.",
            userId: 26,
            createdAt:  "2017-07-05T18:35:21.365Z",
            updatedAt: "2017-07-05T18:35:21.365Z"
          },
          {
            id:5,
            company: "Microsoft",
            jobTitle: "Software Architect II",
            city: "Redmond",
            status: "Offered",
            date: "2017-06-03",
            url: "www.microsoft.com",
            notes: "Interview went well and just received an offer.",
            userId: 27,
            createdAt:  "2017-07-05T18:35:21.365Z",
            updatedAt: "2017-07-05T18:35:21.365Z"
          },
          {
            id:6,
            company: "Costco",
            jobTitle: "Web Developer II",
            city: "San Diego",
            status: "Interested",
            date: "2017-06-02",
            url: "www.costco.com",
            notes: "Looks to be a good oportunity with a great company.",
            userId: 27,
            createdAt:  "2017-07-05T18:35:21.365Z",
            updatedAt: "2017-07-05T18:35:21.365Z"
          },
          {
            id:7,
            company: "Underground Elephant",
            jobTitle: "Web Developer",
            city: "San Diego",
            status: "Interested",
            date: "2017-06-04",
            url: "www.undergroundelephant.com",
            notes: "Looks to be a good cultural fit with a great company in the East Village, SD.",
            userId: 27,
            createdAt:  "2017-07-05T18:35:21.365Z",
            updatedAt: "2017-07-05T18:35:21.365Z"
          },
          {
            id:8,
            company: "Intuit",
            jobTitle: "Software Developer",
            city: "San Diego",
            status: "Applied",
            date: "2017-06-01",
            url: "www.intuit.com",
            notes: "Found a good oportunity with a solid company.",
            userId: 26,
            createdAt:  "2017-07-05T18:35:21.365Z",
            updatedAt: "2017-07-05T18:35:21.365Z"
          },
        ])
      })
      return Promise.all(jobPromises)
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Jobs', null, {})
  }
};
