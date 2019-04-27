const router = require('express').Router();
const UserController = require('../../controllers/UserController');

router.post('/login', UserController.userlogin);

router.post('/register', UserController.createUser);

module.exports = router;
