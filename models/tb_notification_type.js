/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_notification_type', {
    Id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    Names: {
      type: DataTypes.ENUM('new offers','orders','reminders','useractivitybased','reviews'),
      allowNull: false
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'tb_notification_type'
  });
};
