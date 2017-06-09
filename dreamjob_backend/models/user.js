'use strict';
const crypto = require('crypto')
const uuid = require('uuid/v1')

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false // <-- Database level validations
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isEmail: true  // <-- Code level validations
      }
    },
    encryptedPassword: {
      type: DataTypes.STRING,
      allowNull: false
    },
    authToken: DataTypes.STRING,
    authTokenExpiration: DataTypes.DATE,
    salt: DataTypes.STRING
  }, {
    setterMethods:{
      // Virtual method for password
      // Password does not exist in the database, but rather
      // it is transformed to the 'encryptedPassword' value and stored as that
      password(value){
        if(value){
          const salt = uuid()
          this.setDataValue('salt', salt)
          const hash = this.encrypt(value)
          this.setDataValue('encryptedPassword', hash)
        }
      }
    },
    instanceMethods:{

      // Method to encrypt any value using salt from user record
      encrypt(value){
        const salt = this.get('salt')
        return crypto.createHmac('sha512', salt)
          .update(value)
          .digest('hex')
      },

      // Checks to see if passed value matches encrypted password value from record
      verifyPassword(unverifiedPassword){
        //encrypt unverifiedPassword
        const encryptedUnverifiedPassword = this.encrypt(unverifiedPassword)
        //compare encryptedUnverifiedPassword with password
        return encryptedUnverifiedPassword === this.get('encryptedPassword')
      },
      toJSON(){
        return {
          id: this.get('id'),
          firstname: this.get('firstname'),
          lastname: this.get('lastname'),
          email: this.get('email'),
          authToken: this.get('authToken'),
          authTokenExpiration: this.get('authTokenExpiration')
        }
      },
      setAuthToken(){
        const token = uuid()
        const expiration = new Date()
        expiration.setMonth(expiration.getMonth() + 1)
        this.setDataValue('authToken', token)
        this.setDataValue('authTokenExpiration', expiration)
      }
    },
    hooks:{
      beforeCreate: function(User, options){
        User.setAuthToken()
      }
    },
    classMethods: {
      associate: function(models) {
       User.hasMany(models.Job,{
         foreignKey: 'userId',
         as: 'jobs'
       })
    }
  }
  });
  return User;
};
