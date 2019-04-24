/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_product_details', {
    Id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    ProductCode: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Color: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Brand: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Dimensions: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    IsReturnPolicy: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    Warranty: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    Weight: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    CountryId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'tb_country',
        key: 'id'
      }
    },
    ProductId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'tb_product',
        key: 'id'
      },
      unique: true
    }
  }, {
    tableName: 'tb_product_details'
  });
};
