const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const {connection} = require('./../database');
const config = require('./../config');
const {validationResult} = require('express-validator/check');
const UserService = require('./../services/UserService');
const IndexService = require('../services/IndexService');
const {dashboard} = require('../routes/index');

var addNewUserTemplate = (req, res) => {
    res.render('users/signup.ejs', {
        title: 'User SignUp Page',
        message: ''
    });
};
var addNewUser = async(req, res) => {
    try {
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
        //console.log(post);
        let checkUserExistence = await UserService.checkUser(post.email);
        console.log(checkUserExistence.rows.length);
        if(checkUserExistence.rows.length) {
            return res.json({
                message: "user already exist",
                error: true
            });
        }
        else {
            let addUser = await UserService.addUser(post);
            //create a token
            var token = jwt.sign({id: addUser.user_id}, config.secret, {
                expiresIn: 86400
            });
            return res.json({
                message: "user signed up successfully",
                token,
                error: false
            });
        }
    } catch(err) {
        return res.json({
            "message": "some error occured",
            "error": err
        });
    }
};

var userLoginCheck = async(req, res) => {
    //console.log(req.body);
    //var errors = validationResult(req);
    // if(!errors.isEmpty()) {
    //     res.status(400).json(errors.array());
    // }
    try {
        var post = {
            email: req.body.email,
            password: req.body.password
        };
        var isUserExisted = await UserService.userLoginCheckService(post);
        console.log(isUserExisted);
        if(isUserExisted.length) {
            var loggedIn = await UserService.userLogIn(isUserExisted);
            jwt.verify(loggedIn.token, config.secret, function(err, decoded) {
                if(err)
                    return res.status(500).send({auth: false, message: 'Failed to authenticate token'});
                //save to request
                req.userId = decoded.rows[0].user_id;
            });
            console.log(loggedIn.token);
            req.headers.authorization = "Bearer" + " " + loggedIn.token;
            const bearerHeader = req.headers['authorization'];
            console.log(typeof bearerHeader);
            if(typeof bearerHeader !== 'undefined') {
                const bearer = bearerHeader.split(" ");
                const bearerToken = bearer[1];
                req.token = bearerToken;
                console.log(req.token);
                //next();
                dashboard(req, res);
            } else {
                res.render('users/signup.ejs',{
                    title: 'Welcome to SignUp/Login page',
                    message: ''
                });
            }
            //dashboard(req, res);
            // return res.json({
            //     "message": "logged in successfully", 
            //     "error": false, 
            //     "token": loggedIn.token
            // });
            
            // return res.render('index.ejs', {
            //     title: 'Dashboard',
            //     getRandomProducts,
            //     getTopTenProducts
            // }); 
        } else {
            return res.render('users/signup.ejs',{
                title: 'Welcome to SignUp/Login page',
                message: 'Check email and password'
            });
        }
    } catch(err) {
        //handle error
        return res.json({
            "message": "some error occured",
            "error": err
        });
    }
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

module.exports = {addNewUserTemplate, addNewUser, userLoginCheck, findAllUsers, myProtectedRoute, editUser};