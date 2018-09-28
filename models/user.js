'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type : DataTypes.STRING,
      validate : {
        minLength : function(input, cbMinLength){
          if(input.length < 8){
            cbMinLength('Username must use min 8 character')
          }
          else{
            cbMinLength()
          }
        },
        notDuplicate : function(input, cbNotduplicate){
          const Op = sequelize.Op
          User.findOne({
            where : {id : {[Op.ne] : this.id},
             username : input}
          })
          .then(data => {
            if(data) cbNotduplicate('Username Already Use!')
            else cbNotduplicate()
          })
          .catch(err => {
            cbNotduplicate()
          })
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        minLength : function(input, cbMinLength){
          if(input.length < 8){
            cbMinLength('Password must use min 8 character')
          }
          else{
            cbMinLength()
          }
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      validate : {
        isEmail : {
          args : true,
          msg : 'please use valid email'
        },
        notDuplicate : function(input, cbNotduplicate){
          const Op = sequelize.Op
          User.findOne({
            where : {id : {[Op.ne] : this.id},
             email : input}
          })
          .then(data => {
            if(data) cbNotduplicate('Email Already Use!')
            else cbNotduplicate()
          })
          .catch(err => {
            cbNotduplicate()
          })
        }
      }
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate : (User, option) => {
        if(!User.role){
          User.role = 'user'
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