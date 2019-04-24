const router = require('express').Router();
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const {connection} = require('./../database');
const config = require('./../config');
const {signUpValidation, loginValidation } =  require('../utility/validation');
const UserService = require('../services/UserService');

//new api for register
router.post('/register', async(req, res) => {
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
		let checkUserExistence = await UserService.checkUser(post.email);
		console.log(checkUserExistence.rows.length);
		if (checkUserExistence.rows.length) {
			return res.json({
				message: "user already exist",
				error: true
			});
		}
		else {
			let addUser = await UserService.addUser(post);
			return res.json({
				message: "user signed up successfully",
				error: false
			});
		}
	} catch(err) {
		return res.json({
			"message": "error occurred in register api"
		})
	}
});

//new api for login
router.post('/login', async(req, res) => {
	try {
		var post = {
			email: req.body.email,
			password: req.body.password
		};
		var isUserExisted = await UserService.userLoginCheckService(post);
		console.log(isUserExisted);
		if (isUserExisted.length) {
			var loggedIn = await UserService.userLogIn(isUserExisted);
			// jwt.verify(loggedIn.token, config.secret, function (err, decoded) {
			// 	if (err)
			// 		return res.status(500).send({ auth: false, message: 'Failed to authenticate token' });
			// 	//save to request
			// 	req.userId = decoded.rows[0].user_id;
			// });
			console.log(loggedIn.token);
			if(loggedIn.token) {
				return res.send(loggedIn.token);
			} else {
				return res.json({"error": "failed to generate token"});
			}
		} else {
			return res.status(400).json({error: 'User does not exist'});
		}
	} catch (err) {
		//handle error
		return res.json({
			"message": "some error occured",
			"error": err
		});
	}
})

router.get('/all', (req, res) => {
  // code for getting all users
  // console.log(req.body);
  UserService
  	.showAllUsers()
  	.then((res) => {
  		return res.json({
  			message: "users successfully fetched",
  			result: res
  		});
  	})
  	.catch((err) => {
  		return res.json({
  			message: "unable to fetch users"
  		});
  	});
  // send response
});

router.post('/new', (req, res) => {
  // code for new user
});

router.get('/:id/edit', (req, res) => {
	//code to edit a user info
});

module.exports = router;