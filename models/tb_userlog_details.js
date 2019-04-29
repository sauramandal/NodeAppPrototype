/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_userlog_details', {
    Id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    LogId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'tb_userlog',
        key: 'Id'
      }
    },
    Details: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    UpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'tb_userlog_details'
  });
};
