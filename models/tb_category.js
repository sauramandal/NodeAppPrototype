/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_category', {
    ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    CATEGORY_NAME: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    CATEGORY_DESC: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'tb_category'
  });
};
