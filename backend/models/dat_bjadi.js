'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dat_bjadi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  dat_bjadi.init({
    kategori: DataTypes.STRING,
    nm_bjadi: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'dat_bjadi',
  });
  return dat_bjadi;
};