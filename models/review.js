'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    rating: DataTypes.FLOAT,
    comment: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    GameId: DataTypes.INTEGER
  }, {});
  Review.associate = function(models) {
    Review.belongsTo(models.User)
    Review.belongsTo(models.Game)
  };
  return Review;
};