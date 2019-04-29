/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_notification', {
    Id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    TypeId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    RecipientId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    SenderId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    Message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    IsRead: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    Role: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    }
  }, {
    tableName: 'tb_notification'
  });
};
