/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_plans', {
    Id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    PlanName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    CreditsPerMonth: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    PricePerMonth: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    PricePerYear: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    IsAutoRenewed: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    IsShippingFree: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    IsOneDayDelivery: {
      type: DataTypes.INTEGER(1),
      allowNull: true
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
    tableName: 'tb_plans'
  });
};
