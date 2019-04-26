/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_review', {
    Id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    UserId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    ProductId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    Title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Content: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    CreatedBy: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    ModifiedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ModifiedBy: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    ActiveFlag: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    }
  }, {
    tableName: 'tb_review'
  });
};
