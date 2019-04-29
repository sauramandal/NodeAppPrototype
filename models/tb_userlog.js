/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_userlog', {
    Id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    UserId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    LoginTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    LogoutTime: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'tb_userlog'
  });
};
