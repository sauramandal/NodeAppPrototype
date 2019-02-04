module.exports = {
  addUser: function (post) {
    return new Promise((resolve, reject) => {
      var queryString = "SELECT email FROM ?? WHERE ?? = ?";
      var table = ["user", "email", post.email];
      queryString = mysql.format(queryString, table);
      connection.query(queryString, (err, rows) => {
        if (err)  {
          return reject({
            "error": true,
            "message": "Error in executing sql"
          });
        }

          //query executed successfully
        if(rows.length == 0) {
          //Insert new user
          var queryString = "INSERT INTO ?? (`first_name`, `last_name`)  values (?, ?) ";
          var table = ["user"];
          queryString = mysql.format(queryString, table);
          connection.query(queryString, [ post.first_name, post.last_name ], (err, rows) => {
              if(err) {
                return reject({
                  "error": true,
                  "message": "Error in executing sql"
                });
              }

              return resolve({
                "Error": false,
                "Message": "Success"
              });
          });
        }
      });
    });
  },
  
  userLoginCheckService: function(post) {
    var queryString = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
    var tableValues = ["user", "password", md5(post.password), "email", post.email];
    queryString = mysql.format(queryString, tableValues);
    connection.query(queryString, (err, rows) => {
        if(err) {
            res.json({"Error": true, "Message": "Error executing Mysql query"});
        } else {
            if(rows.length == 1) {
                //const user = {id: rows[0].userid};
                //var userdata = rows[0].userid;
                //user exist in db, with the email and password
                var token = jwt.sign({rows}, config.secret, { expiresIn: 1440 });
                console.log(token);
                res.json({
                    success: true,
                    message: 'Token Generated',
                    token: token
                });
            } else {
                res.json({"Error": true, "Message": "Incorrect email/password"});
            }
        }
    });
  }
}