/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_product', {
    id: {
      type: DataTypes.INTEGER(12),
      allowNull: false,
      primaryKey: true
    },
    product_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    product_price: {
      type: "DOUBLE",
      allowNull: false
    },
    product_description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    product_image: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'tb_category',
        key: 'ID'
      }
    },
    company_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'tb_company',
        key: 'id'
      }
    }
  }, {
    tableName: 'tb_product'
  });
};
