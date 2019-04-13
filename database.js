const mysql = require('mysql');
const config = require('./config');
const Sequelize = require('sequelize');

const fs = require('fs');
const path = require('path');
// const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const db = {};

var connection = mysql.createConnection({
  host: 'db4free.net',
  user: 'pritimaysaura',
  password: config.dbPassword,
  database: config.databaseName,
  debug: true
});

// connection.connect((err) => {
//   if(err) 
//     throw err;
//   console.log('Connected successfully to mysql server');
// });

const sequelize = new Sequelize({
  host: config.host,
  database: config.databaseName,
  username: config.username,
  password: config.password,
  dialect: 'mysql',
  define: {
    timestamps: false
  }
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


module.exports = {connection, sequelize, db};
// module.exports = {};