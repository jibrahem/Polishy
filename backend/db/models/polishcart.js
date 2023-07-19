'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PolishCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PolishCart.belongsTo(models.User, { foreignKey: 'userId' })
      PolishCart.belongsTo(models.Polish, { foreignKey: 'polishId' })
    }
  }
  PolishCart.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate:{
        max: 5
      }
    },
    polishId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Polishes' }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: 'Users' }
    },
  }, {
    sequelize,
    modelName: 'PolishCart',
  });
  return PolishCart;
};
