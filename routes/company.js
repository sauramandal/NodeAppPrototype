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
  
  // //test
  // var testObj = {
  //   id: 1,
  //   nicename: "United States"
  // };
  //console.log(testObj);
  // res.render('company/AddCompany.ejs', {
  //   title: 'Add a company',
  //   companies: testObj
  // });
});

router.post('/new', (req, res) => {
  //console.log(req.body);
  //res.json(req.body);
  var queryString = "SELECT email FROM ?? WHERE ?? = ?";
  var values = ["TB_COMPANY", "email", req.body.email];
  queryString = mysql.format(queryString, values);
  connection.query(queryString, (err, rows) => {
    if(err) {
      res.send(err);
    } else {
      if(rows.length == 0)
      {
        var companyObj = [
          req.body.address1,
          req.body.address2,
          req.body.city,
          req.body.companyName,
          md5(req.body.confirmPassword),
          md5(req.body.password),
          req.body.country,
          req.body.email,
          req.body.phoneNumber,
          req.body.state,
          req.body.userName,
          req.body.zip
        ];
        let queryString = "INSERT INTO ?? (`address1`,`address2`,`city`,`company_name`,`confirm_password`,\
                          `password`,`country`,`email`,`phone`,`state`,`username`,`zip`) \
                          VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
        let table = ["TB_COMPANY"];
        console.log(companyObj);

        queryString = mysql.format(queryString, table);
        connection.query(queryString, companyObj, (err, rows) => {
          if(err) {
            res.send(err);
          } else {
            
            console.log(companyObj);
            res.send(JSON.stringify(companyObj, null, 3));
          }
        });
      }
    }
  });
  
});

router.get('/getCompaniesList', (req, res) => {
  res.render('company/ViewCompanyList', {
    title: "View Company List"
  });
});

router.post('/getCompanyList', (req, res) => {
  var orderingColumnNo = req.body.order[0].column;
  var orderingColumn = req.body.columns[orderingColumnNo].name;
  var orderingDirection = req.body.order[0].dir;
  var filter = req.body.search.value;
  var length = req.body.length;
  var start = req.body.start;
  var draw = req.body.draw;
  
  var gridSortColumn = orderingColumn;
  var gridSortDirection = orderingDirection;
  var filterValue = filter;
  //res.send(JSON.stringify({"name" : "xyz"}, null, 3));
  var queryString = "SELECT id AS A_REG_ID, \
                      company_name AS B_COMPANY_NAME, \
                      city AS C_CITY, \
                      phone AS D_PHONE, \
                      country AS E_COUNTRY \
                    FROM ??";
  var tableValues = ["TB_COMPANY"];
  console.log('Hey there');
  queryString = mysql.format(queryString, tableValues);
  connection.query(queryString, (err, rows) => {
    if(err)
      res.send(err);
    else {
      //console.log(rows);
      //convert to dt format
      var dataArray = new Array;
      for(let i=0;i<rows.length;i++) 
      {
        dataArray[i] = new Array;
        let regId = rows[i].A_REG_ID;
        let companyName = rows[i].B_COMPANY_NAME;
        let city = rows[i].C_CITY;
        let phone = rows[i].D_PHONE;
        let country = rows[i].E_COUNTRY;
        dataArray[i].push(regId, companyName, city, phone, country);
      }
      var obj = {};  
      obj["recordsTotal"] = rows.length;
      obj["recordsFiltered"] = rows.length;
      obj["draw"] = parseInt(draw);
      obj["data"] = dataArray;
      //var results = JSON.stringify(rows);
     
      //console.log(obj); 
      res.send(JSON.stringify(obj));
    }
  });
});

module.exports = router;