const router = require('express').Router();
const {signUpValidation, loginValidation } =  require('../utility/validation');
const UserService = require('../services/UserService');

router.get('/all', (req, res) => {
  // code for getting all users
  console.log(req.body);
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

module.exports = router;