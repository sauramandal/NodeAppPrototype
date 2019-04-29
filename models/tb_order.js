/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_order', {
    ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    USER_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id'
      }
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
    },
    SHIPPER_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'tb_shipper',
        key: 'Id'
      }
    },
    ShipmentMethod: {
      type: DataTypes.ENUM('Cash on delivery','Debit/Credit Card'),
      allowNull: false,
      defaultValue: 'Cash on delivery'
    },
    TRACKING_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'tb_order'
  });
};
