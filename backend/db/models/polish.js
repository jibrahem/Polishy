'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Polish extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Polish.belongsTo(models.User, { foreignKey: 'userId', as: 'Seller' });
      Polish.hasMany(models.Review, { foreignKey: 'polishId', hooks: true, onDelete: 'CASCADE' });
      // Polish.belongsTo(models.Cart, { foreignKey: 'polishId'});
    }
  }
  Polish.init({
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Users' }
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    price: {
      allowNull: false,
      type: DataTypes.DECIMAL,
    },
    image: {
      allowNull: false,
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Polish',
  });
  return Polish;
};
