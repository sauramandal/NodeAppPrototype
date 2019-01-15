const mysql = require('mysql');
const express = require('express');
const md5 = require('MD5');
const jwt = require('jsonwebtoken');
const connection = require('./../database');

var addNewUser = (req, res) => {
    var date = new Date();
    var post = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: md5(req.body.password),
        dob: req.body.dob,
        phone_number: req.body.phone_number,
        device_type: req.body.device_type,
        device_token: req.body.device_token
    };
    console.log(post);
    var queryString = "SELECT email FROM ?? WHERE ?? = ?";
    var table = ["user", "email", post.email];
    queryString = mysql.format(queryString, table);
    connection.query(queryString, (err, rows) => {
        if(err) {
            res.json({
                "Error": true,
                "Message": "Error executing sql query"
            });
        } else {
            //query executed successfully
            if(rows.length == 0) {
                //Insert new user
                var queryString = "INSERT INTO ?? SET ?";
                var table = ["user"];
                queryString = mysql.format(queryString, table);
                connection.query(queryString, (err, rows) => {
                    if(err) {
                        res.json({"Error": true, "Message": "Error executing Mysql query"});
                    } else {
                        res.json({"Error": true, "Message": "Success"});
                    }
                });
            }
        }
    });
};

var userLoginCheck = (req, res) => {
    var post = {
        email: req.body.email,
        password: req.body.password
    };
    var queryString = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
    var tableValues = ["user", "password", md5(post.password), "email", post.email];
    queryString = mysql.format(queryString, tableValues);
    connection.query(queryString, (err, rows) => {
        if(err) {
            res.json({"Error": true, "Message": "Error executing Mysql query"});
        } else {
            if(rows.length == 1) {
                //user exist in db, with the email and password
                var token = jwt.sign(rows, config.secret, { expiresIn: 1440 });
                user_id = rows[0].userid;
                var data = {
                    user_id: rows[0].userid,
                    access_token: token,
                    device_token: rows[0].device_token
                };
                var queryString = "INSERT INTO ?? SET ?";
                var values = ["access_token"];
                queryString = mysql.format(queryString, values);
                connection.query(queryString, data, (err, rows) => {
                    if(err) {
                        res.json({"Error": true, "Message": "Error in executing mysql query"});
                    } else { 
                        //return token info
                        res.json({
                            success: true,
                            message: 'Token Generated',
                            token: token,
                            currUser: user_id
                        });
                    }
                });
            } else {
                res.json({"Error": true, "Message": "Incorrect email/password"});
            }
        }
    });
};

var findAllUsers = (req, res) => {
    var queryString = "SELECT * FROM ??";
    var values = ["user"];
    queryString = mysql.format(queryString, value);
    connection.query(queryString, (err, rows) => {
        if(err) {
            res.json({"Error": true, "Message": "Error executing mysql query"});
        } else {
            res.json({"Error": false, "Message": "Success", "Users": rows});
        }
    });
};

module.exports = {addNewUser, userLoginCheck, findAllUsers};