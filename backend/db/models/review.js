'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.Polish, { foreignKey: 'polishId' });
      Review.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Review.init({
    polishId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Polishes' }
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Users' }
    },
    review: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    stars: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    image: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
