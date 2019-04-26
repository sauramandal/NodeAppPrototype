/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_subscription', {
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
    PlanId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'tb_plans',
        key: 'Id'
      }
    },
    StartDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    EndDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    tableName: 'tb_subscription'
  });
};
