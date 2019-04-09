const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const {connection} = require('./../database');
const config = require('./../config');
const IndexService = require('../services/IndexService');
const UserService = require('../services/UserService');

var dashboard = async(req, res) => {
    try {
        var showTopTenProducts;
        var showBestRatedProducts;
        var showProductsBasedOnYourViews;
        var userLogInfo;
        var userId = req.userId;
        console.log(req.userId);
        console.log('got token');
        if(userId) {
            userLogInfo = await UserService.showUserData(userId);
            let [ getRandomProducts, getTopTenProducts ] = await Promise.all([
                IndexService.getRandomizedProducts(),
                IndexService.getTopTenSoldProducts()
            ]);
            return res.render('index.ejs', {
                title: 'Dashboard',
                getRandomProducts,
                getTopTenProducts,
                userData: userLogInfo,
                token: req.token
            });
        }
        return res.render('users/signup.ejs', {
            title: 'Welcome to User Auth page',
            message: ''
        });
        /*if(req.token == undefined) {
            userLogInfo = '';
            console.log(userLogInfo);
            return res.render('users/signup.ejs', {
                title: 'Welcome to User Auth page',
                message: ''
            });
        }
        else {
            console.log(req.token);
            jwt.verify(req.token, config.secret, function(err, data) {
                if(err) {
                    console.log(err);
                    userLogInfo = '';
                } else {
                    userLogInfo = data;
                }
            });
            console.log(userLogInfo.rows[0].first_name);
            let [ getRandomProducts, getTopTenProducts ] = await Promise.all([
                IndexService.getRandomizedProducts(),
                IndexService.getTopTenSoldProducts()
            ]);
            res.render('index.ejs', {
                title: 'Dashboard',
                getRandomProducts,
                getTopTenProducts,
                userData: userLogInfo,
                token: req.token
            });
        }*/
  
    } catch(err) {
        return res.json({
            error: err
        });
    }
    
};

module.exports = {dashboard};