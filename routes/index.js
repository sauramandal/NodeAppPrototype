const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const {connection} = require('./../database');
const config = require('./../config');

var dashboard = (req, res) => {
    res.render('index.ejs', {
        title: 'Dashboard',
    });
};

module.exports = {dashboard};