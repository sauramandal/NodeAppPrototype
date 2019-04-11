const mysql = require('mysql');
const config = require('./config');
const Sequelize = require('sequelize');

var connection = mysql.createConnection({
  host: 'db4free.net',
  user: 'pritimaysaura',
  password: config.dbPassword,
  database: config.databaseName,
  debug: true
});

connection.connect((err) => {
  if(err) 
    throw err;
  console.log('Connected successfully to mysql server');
});

const sequelize = new Sequelize({
  host: config.host,
  database: config.databaseName,
  username: config.username,
  password: config.password,
  dialect: 'mysql'
});

module.exports = {connection, sequelize};
// module.exports = {};