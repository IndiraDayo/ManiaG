'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate : (User, option) => {
        if(!User.role){
          User.role = 'users'
        }
      }
    }
  });
  User.associate = function(models) {
    User.belongsToMany(models.Game, {through: 'Review'})
    User.hasMany(models.Review)
  };
  return User;
};