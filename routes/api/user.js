const router = require('express').Router();
const UserController = require('../../controllers/UserController');

router.post('/login', UserController.userlogin);

module.exports = router;
