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
    }
  }
  PolishCart.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    polishId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Polishes' }
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Carts' }
    }
  }, {
    sequelize,
    modelName: 'PolishCart',
  });
  return PolishCart;
};
