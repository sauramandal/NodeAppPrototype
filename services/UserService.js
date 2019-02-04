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
    //return a new promise object
    return new Promise((resolve, reject) => {
      var queryString = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
      var tableValues = ["user", "password", md5(post.password), "email", post.email];
      queryString = mysql.format(queryString, tableValues);
      connection.query(queryString, (err, rows) => {
        if(err){
          return reject({
            "error": true,
            "message": "Error in executing sql"
          });
        }

        //query successfully executed
        else {
          if(rows.length == 1) {
            var token = jwt.sign({rows[0].userid, rows[0].email}, config.secret, { expiresIn: 1440 });
            return resolve({
              "error": false,
              "message": "Token generated for user"
            });
          } else {
            return reject({
              "error": true,
              "message": "error in token generation"
            });
          }
        }
      });
    });   
  },

  showAllUsers: function() {
    return new Promise((resolve, reject) => {
      var queryString = "SELECT * FROM ?? LIMIT 100"; //show 100 users
      var values = ["user"];
      queryString = mysql.format(queryString, values);
      connection.query(queryString, (err, rows) => {
        if(err) {
          return reject({
            "error": false,
            "message": "error in query execution"
          });
        } else {
          return resolve({
            "error": true,
            "message": "query executed successfully",
            "users": rows
          });
        }
      });
    });
  }
}