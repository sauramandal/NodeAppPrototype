/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_order', {
    ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    USER_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    ORDER_DATE: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    ORDER_AMOUNT: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    ORDER_PLACED: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    DELIVERY_ADDRESS: {
      type: DataTypes.STRING(256),
      allowNull: true
    }
  }, {
    tableName: 'tb_order'
  });
};
