const router = require('express').Router();
const {ensureToken} = require('../middleware/ensureToken');
const OrderController = require('../controllers/OrderController');
const UserController = require('../controllers/UserController');

// router.get('/orders', OrderService.allOrders);
router.get('/showAllOrders', OrderController.getAllOrders);
//viewing my todays orders
router.get('/:id/showTodaysOrder', OrderController.getTodaysOrder);
router.post('/userlogin', UserController.userlogin);
module.exports = router;
