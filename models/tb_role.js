/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_role', {
    Id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    Name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Description: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    CreatedBy: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    CreateDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    ModifiedBy: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    ModifiedDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ActiveFlag: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    tableName: 'tb_role'
  });
};
