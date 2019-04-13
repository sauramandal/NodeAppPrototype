const router = require('express').Router();
const OrderService = require('../services/OrderService');

router.get('/orders', OrderService.allOrders);

module.exports = router;
