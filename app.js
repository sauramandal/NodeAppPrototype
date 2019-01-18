const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const config = require('./config');

const {addNewUser, userLoginCheck, findAllUsers} = require('./routes/user');
const {verifyToken} = require('./middleware/verifyToken');

var app = express();
var port = process.env.PORT || 3000;
//set up middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(port, function() {
    console.log(`Express server started on port: ${port}`);
});

app.post('/signup', addNewUser);
app.post('/login', verifyToken, userLoginCheck);
app.get('/users', verifyToken, findAllUsers);