/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_product_discount', {
    ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    PRODUCT_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'tb_product',
        key: 'id'
      }
    },
    DISCOUNT_VALUE: {
      type: "DOUBLE",
      allowNull: false
    },
    DATE_CREATED: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    VALID_UNTIL: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    COUPON_CODE: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    MINIMUM_ORDER_VALUE: {
      type: "DOUBLE",
      allowNull: false
    }
  }, {
    tableName: 'tb_product_discount'
  });
};
