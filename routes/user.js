const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const {connection} = require('./../database');
const config = require('./../config');
const {validationResult} = require('express-validator/check');
const UserService = require('./../services/UserService');

var addNewUser = (req, res) => {
    var date = new Date();
    var post = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        dob: req.body.dob,
        phone_number: req.body.phone_number,
        device_type: req.body.device_type,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        is_verified: req.body.is_verified,
        block_status: req.body.block_status
    };
    console.log(post);
    UserService
        .addUser(post)
        .then((res) => {
            return res.json({
                message: "user added",
                result: res
            });
        })
        .catch((err) => {
            //handle error or log error
            return res.json({
                message: "unable to add user",
                result: err
            });
        });
};

var userLoginCheck = (req, res) => {
    //console.log(req.body);
    var errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json(errors.array());
    }
    var post = {
        email: req.body.email,
        password: req.body.password
    };
    UserService
        .userLoginCheckService(post)
        .then((res) => {
            return res.json({
                message: "user logged in"
            });
        })
        .catch(err => {
            return res.json({
                message: "user unable to log in"
            });
        });
};

var myProtectedRoute = (req, res) => {
    jwt.verify(req.token, config.secret, function(err, data) {
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

var editUser = (req, res) => {
    var id = req.params.id;
    var user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        dob: req.body.dob,
        phone_number: req.body.phone_number,
        device_type: req.body.device_type,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        is_verified: req.body.is_verified,
        block_status: req.body.block_status
    };
    //console.log(user);

    UserService
        .updateUser(user, id)
        .then((res) => {
            return res.json({
              message: "updated successfully"
            });
        })
        .catch((err) => {
            //render the edit page
            return res.status(500).send(err);
        });
};

module.exports = {addNewUser, userLoginCheck, findAllUsers, myProtectedRoute, editUser};
