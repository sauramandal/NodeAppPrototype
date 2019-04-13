/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_country', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    iso: {
      type: DataTypes.CHAR(2),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    nicename: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    iso3: {
      type: DataTypes.CHAR(3),
      allowNull: true
    },
    numcode: {
      type: DataTypes.INTEGER(6),
      allowNull: true
    },
    phonecode: {
      type: DataTypes.INTEGER(5),
      allowNull: false
    }
  }, {
    tableName: 'tb_country'
  });
};
