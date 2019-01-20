const mysql = require('mysql');
const express = require('express');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const {connection} = require('./../database');
const config = require('./../config');

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
        device_token: req.body.device_token,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        is_verified: req.body.is_verified,
        block_status: req.body.block_status
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
                connection.query(queryString, post, (err, rows) => {
                    if(err) {
                        res.json({"Error": true, "Message": "Error executing Mysql query"});
                    } else {
                        res.json({"Error": false, "Message": "Success"});
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
};

var myProtectedRoute = (req, res) => {
    jwt.verify(req.token, config.secret, function(err, data) {
        console.log('Hi');
        if(err) {
            console.log(err);
            res.sendStatus(403);
        } else {
            res.json({text: 'Protected Info', data: data});
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

module.exports = {addNewUser, userLoginCheck, findAllUsers, myProtectedRoute};