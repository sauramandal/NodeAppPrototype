const router = require('express').Router();
const OrderService = require('../services/OrderService');

router.get('/orders', OrderService.allOrders);
//viewing my todays orders
router.get('/:id/showTodaysOrder', OrderService.getTodayOrdersForCurrentUser);
module.exports = router;
