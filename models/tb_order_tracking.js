/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_order_tracking', {
    Id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    TrackingStatus: {
      type: DataTypes.ENUM('Pending','Out for delivery','Arrived at unit','Shipped','Delivered'),
      allowNull: false
    },
    CurrentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    CurrentTime: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'tb_order_tracking'
  });
};
