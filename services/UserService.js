const mysql = require("mysql");
const { connection } = require("./../database");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const config = require("./../config");
const Joi = require('joi');

const { db } = require("./../db");

module.exports = {
  checkUser: function(email) {
    return new Promise((resolve, reject) => {
      var queryString = "SELECT email FROM ?? WHERE ?? = ?";
      var table = ["user", "email", email];
      queryString = mysql.format(queryString, table);
      connection.query(queryString, (err, rows) => {
        if (err) {
          return reject({
            error: true,
            message: "Error in executing sql"
          });
        }
        resolve({
          rows
        });
      });
    });
  },

  addUser: function(post) {
    return new Promise((resolve, reject) => {
      //Create an user object
      var userObject = [
        post.first_name,
        post.last_name,
        post.dob,
        post.device_type,
        post.latitude,
        post.longitude,
        post.email,
        md5(post.password),
        post.phone_number,
        post.is_verified,
        post.block_status
      ];
      //Insert new user
      var queryString =
        "INSERT INTO ?? (`first_name`, `last_name`, `dob`, `device_type`, `latitude`,`longitude`, `email`, `password`, \
                        `phone_number`,`is_verified`,`block_status`)  \
                        values (?, ?, str_to_date(?,'%m-%d-%Y'), ?, ?, ?, ?, ?, ?, ?, ?) ";
      var table = ["user"];
      queryString = mysql.format(queryString, table);
      connection.query(queryString, userObject, (err, rows) => {
        console.log("Hi");
        if (err) {
          return reject({
            error: true,
            message: "Error in executing sql"
          });
        }
        resolve(rows);
      });
    });
  },

  userLoginCheckService: function(post) {
    //return a new promise object
    return new Promise((resolve, reject) => {
      const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().min(6).required()
    }).with('email', 'password');

      const login = {
        email: post.email,
        password: post.password
      };
      const validationResult = Joi.validate(login, schema);
      if (validationResult.error) {
        return reject({
          error: true,
          message: "Validation error"
        });
      }

      var queryString = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
      var tableValues = [
        "user",
        "password",
        md5(post.password),
        "email",
        post.email
      ];
      queryString = mysql.format(queryString, tableValues);
      connection.query(queryString, (err, rows) => {
        if (err) {
          return reject({
            error: true,
            message: "Error in executing sql"
          });
        }
        resolve(rows);
        //query successfully executed
        // else {
        //   if(rows.length == 1) {
        //     var token = jwt.sign({rows}, config.secret, { expiresIn: 1440 });
        //     return resolve({
        //       "error": false,
        //       "message": "Token generated for user"
        //     });
        //   } else {
        //     return reject({
        //       "error": true,
        //       "message": "error in token generation"
        //     });
        //   }
        // }
      });
    });
  },

  userLogIn: function(rows) {
    return new Promise((resolve, reject) => {
      if (rows.length) {
        var token = jwt.sign({ rows }, config.secret, { expiresIn: "1h" });
        return resolve({
          error: false,
          message: "Token generated for user",
          token: token
        });
      }
      return reject({
        error: true,
        message: "error in token generation"
      });
    });
  },

  showUserData: function(userId) {
    return new Promise((resolve, reject) => {
      var queryString = "SELECT * FROM ?? WHERE ?? = ?";
      var values = ["user", "user_id", userId];
      queryString = mysql.format(queryString, values);
      connection.query(queryString, (err, rows, fields) => {
        if (err) {
          return reject({
            error: true,
            message: err
          });
        }
        resolve(rows);
      });
    });
  },

  showAllUsers: function() {
    return new Promise((resolve, reject) => {
      var queryString = "SELECT * FROM ?? LIMIT 100"; //show 100 users
      var values = ["user"];
      queryString = mysql.format(queryString, values);
      connection.query(queryString, (err, rows) => {
        if (err) {
          return reject({
            error: false,
            message: "error in query execution"
          });
        }
        return resolve({
          error: true,
          message: "query executed successfully",
          users: rows
        });
      });
    });
  },

  updateUser: function(user, id) {
    return new Promise((resolve, reject) => {
      //console.log(user);
      var editedUser = [
        user.first_name,
        user.last_name,
        user.email,
        md5(user.password),
        user.dob,
        user.phone_number,
        user.device_type,
        user.latitude,
        user.longitude,
        user.is_verified,
        user.block_status,
        id
      ];
      //console.log(editedUser);
      var queryString =
        "UPDATE ?? SET `first_name` = ?,`last_name` = ?, `email` = ?, `password` = ?,\
                        `dob` = ?, `phone_number` = ?,`device_type` = ?,`latitude` = ?,\
                        `longitude` = ?, `is_verified` = ?, `block_status` = ? WHERE user_id = ?";

      var table = ["user"];
      queryString = mysql.format(queryString, table);
      console.log(queryString);

      console.log("Hi");
      connection.query(queryString, editedUser, (err, rows) => {
        if (err) {
          console.log("rejected");
          return reject({
            error: true,
            message: "error in sql query execution"
          });
        }
        resolve({
          error: false,
          message: "query executed successfully"
        });
      });
    });
  },

  createUser: async (req, res) => {
    try {
      // Insert new user
      return await db.user
        .create({
          first_name: req.body.firstName,
          last_name: req.body.lastName,
          dob: req.body.dob,
          device_type: "web",
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          email: req.body.email,
          phone_number: req.body.mobile,
          password: md5(req.body.password),
          is_verified: 1,
          block_status: 0
        })
        .then(res.status(200).send({
          error: false,
          message: "user added successfully",
        }))
        .catch(error => {
          res.status(400).send(error);
        });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
};
