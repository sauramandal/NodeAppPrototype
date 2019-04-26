/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_stock', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'tb_product',
        key: 'id'
      }
    },
    changed_by: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'tb_stock'
  });
};
