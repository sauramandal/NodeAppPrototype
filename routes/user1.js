const router = require('express').Router();
const {signUpValidation, loginValidation } =  require('../utility/validation');

router.get('/all', (req, res) => {
  // code for getting all users
  // send response
});

router.post('/new', (req, res) => {
  // code for new user
});

module.exports = router;