const router = require('express').Router();
const mysql = require('mysql');
const {connection} = require('./../database');
const md5 = require('md5');
const config = require('./../config');

router.get('/new', (req, res) => {
  var queryString = "SELECT nicename FROM ??";          
  var table = ["TB_COUNTRY"];
  queryString = mysql.format(queryString, table);
  connection.query(queryString, (err, rows) => {
    if(err) {
      res.status(500).send(err);
    }
    //console.log(rows);
    res.render('company/AddCompany.ejs', {
      title: 'Add new company',
      companies: rows
    });
  }); 
});

router.post('/new', (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

module.exports = router;