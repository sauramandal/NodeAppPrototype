const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const db = {};
const config = require('./config');

const sequelize = new Sequelize({
    host: config.host,
    database: config.databaseName,
    username: config.username,
    password: config.password,
    dialect: 'mysql',
    define: {
      timestamps: false
    },
    pool: {
      max: 100,
      min: 0,
      idle: 200000,
      acquire: 1000000
    }
  });

  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
  
  
  fs
    .readdirSync(__dirname + '/models')
    .filter(file =>
      (file.indexOf('.') !== 0) &&
      (file !== basename) &&
      (file.slice(-3) === '.js'))
    .forEach(file => {
      const model = sequelize.import(path.join(__dirname, 'models/' + file));
      db[model.name] = model;
    });
  
  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
  
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  
  
  module.exports = { db };