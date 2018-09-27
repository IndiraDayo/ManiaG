'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    title: DataTypes.STRING,
    CategoryId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    image: DataTypes.TEXT
  }, {});
  Game.associate = function(models) {
    Game.belongsToMany(models.User, {through: 'Review'})
    Game.hasMany(models.Review)
    Game.belongsTo(models.Category)
  };
  return Game;
};