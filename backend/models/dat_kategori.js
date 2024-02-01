'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dat_kategori extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  dat_kategori.init({
    kategori: DataTypes.STRING,
    kode: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'dat_kategori',
  });
  return dat_kategori;
};