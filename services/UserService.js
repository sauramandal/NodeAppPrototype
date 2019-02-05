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
            var token = jwt.sign({rows}, config.secret, { expiresIn: 1440 });
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
        } 
          return resolve({
            "error": true,
            "message": "query executed successfully",
            "users": rows
          });
        
      });
    });
  },

  updateUser: function(user) {
    return new Promise((resolve, reject) => {
      var queryString = "UPDATE ?? (`first_name`,`last_name`,`email`,`password`,`dob`,`phone_number`,\
                      `device_type`,`device_token`,`latitude`,`longitude`,`is_verified`,`is_blocked`) \
                      VALUES (? ? ? ? ? ? ? ? ? ? ? ?) WHERE id = ?";
      var table = ["user"];
      queryString = mysql.format(queryString, table);
      var editedUser = [
        user.first_name,
        user.last_name,
        user.email,
        md5(post.password),
        user.dob,
        user.phone_number,
        user.device_type,
        user.device_token,
        user.latitude,
        user.longitude,
        user.is_verified,
        user.is_blocked,
        user.id
      ];
      connection.query(queryString, editedUser, (err, rows) => {
        if(err) {
          return reject({
            "error": true,
            "message": "error in sql query execution" 
          });
        } 
        return resolve({
          "error": false,
          "message": "query executed successfully"
        });
      });
    });
  }
}