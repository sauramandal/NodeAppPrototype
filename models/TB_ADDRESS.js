/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_ADDRESS', {
    ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    USER_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    ADDRESS_LINE1: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    ADDRESS_LINE2: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    STATE: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    CITY: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    ZIP: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    tableName: 'TB_ADDRESS'
  });
};
