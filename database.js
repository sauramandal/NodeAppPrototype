const mysql = require('mysql');
const config = require('./config');

var connection = mysql.createConnection({
  host: 'db4free.net',
  user: 'pritimaysaura',
  password: 'daddydidadeadlydeed',
  database: 'shopping_schema',
  debug: true
});

connection.connect((err) => {
  if(err) 
    throw err;
  console.log('Connected successfully to mysql server');
});

module.exports = {connection};
// module.exports = {};