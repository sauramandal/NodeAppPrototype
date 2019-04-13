/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_order_details', {
    ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    ORDER_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    PRODUCT_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    QUANTITY: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    PRICE: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    tableName: 'tb_order_details'
  });
};
