'use strict';
module.exports = function(sequelize, DataTypes) {
  var Job = sequelize.define('Job', {
    company: DataTypes.STRING,
    jobTitle: DataTypes.STRING,
    city: DataTypes.STRING,
    status: DataTypes.STRING,
    date: DataTypes.STRING,
    url: DataTypes.STRING,
    notes: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Job;
};