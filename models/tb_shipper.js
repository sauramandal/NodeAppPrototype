/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_shipper', {
    Id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    CompanyName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Address: {
      type: DataTypes.INTEGER(255),
      allowNull: false
    },
    PhoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    IsProvidingService: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    }
  }, {
    tableName: 'tb_shipper'
  });
};
