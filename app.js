const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const config = require('./config');
const {ensureToken} = require('./middleware/ensureToken');

const {addNewUser, userLoginCheck, findAllUsers, myProtectedRoute} = require('./routes/user');

var app = express();
var port = process.env.PORT || 3000;
//set up middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(port, function() {
    console.log(`Express server started on port: ${port}`);
});

app.post('/signup', addNewUser);
app.post('/login', userLoginCheck);
app.get('/users', findAllUsers);
app.get('/privateRoute', ensureToken, myProtectedRoute);

