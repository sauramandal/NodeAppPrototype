/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_seller', {
    SellerId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    FirstName: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    LastName: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    Address: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    Mobile: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: true
    },
    Email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    Pincode: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    CreatedBy: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    CreatedDate: {
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
      allowNull: false
    },
    Password: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    ConfirmPassword: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    tableName: 'tb_seller'
  });
};
