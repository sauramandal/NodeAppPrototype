/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_cart', {
    Id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    CustomerId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    ProductId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'tb_product',
        key: 'id'
      }
    },
    Quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    CreatedBy: {
      type: DataTypes.INTEGER(11),
      allowNull: false
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
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    tableName: 'tb_cart'
  });
};
