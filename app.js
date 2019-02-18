const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const fileUpload = require('express-fileupload');
const jwt = require('jsonwebtoken');
const config = require('./config');
const { signUpValidation, loginValidation } =  require('./utility/validation');

const {ensureToken} = require('./middleware/ensureToken');
const {check, validationResult} = require('express-validator/check');
const {addNewUser, userLoginCheck, findAllUsers, myProtectedRoute, editUser} = require('./routes/user');

var app = express();
var port = process.env.PORT || 3000;

//set up/configure express middlewares
app.set('views', __dirname + '/views'); //set express to look in this directory to render views
app.set('view engine', 'ejs'); //configure template engine
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static(__dirname + '/public'));
app.use(fileUpload());
//Custom Routes for Products

// Custom Routes for User
app.post('/signup',signUpValidation, addNewUser);
app.post('/login', loginValidation, userLoginCheck);
app.post('/:id/editUser',signUpValidation, editUser);
// app.get('/users', findAllUsers);
// app.get('/privateRoute', ensureToken, myProtectedRoute);

app.use('/users', require('./routes/user1'));
app.use('/products', require('./routes/product'));
//   /users/all


//Custom Routes for Companies
app.use('/companies', require('./routes/company'));

app.listen(port, function() {
    console.log(`Express server started on port: ${port}`);
});
