'use strict';
module.exports = (sequelize, DataTypes) => {
  const Op = sequelize.Op
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
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Masa nulis email aja ga bisa...'
        }, 
        isUnique: function (value, next) {
          console.log(Op)
          User.find({where: {email: value, id: {
            [Op.ne]: this.username
          }}})
              .then(function (user) {
                  // reject if a different user wants to use the same email
                  if (user) {
                    console.log(this.username);
                    
                      return next('Email already in use!');
                  }
                  return next();
              })
              .catch(function (err) {
                  return next(err);
              });
        }
      }},
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