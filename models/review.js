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
  Review.prototype.getStar = function(){
    let star =''
    for(let i = 0; i < this.rating; i++){
      star += '*'
    }
    return star
  }

  return Review;
};