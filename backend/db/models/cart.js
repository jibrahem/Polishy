'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Cart.belongsTo(models.User, { foreignKey: 'userId' , hooks: true, onDelete: 'CASCADE' })
      // Cart.belongsToMany(models.Polish, {
      //   through: 'PolishCart',
      //   otherKey: 'polishId',
      //   foreignKey: 'cartId', onDelete: 'CASCADE'
      // })
    }
  }
  Cart.init({
    userId: {
      type: DataTypes.INTEGER,
      references: { model: 'Users' }
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};
