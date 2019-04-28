const router = require('express').Router();
const OrderController = require('../../controllers/OrderController');

router.get('/myorders?:customerid', OrderController.getOrdersByCustomerId);

router.get('/:id', OrderController.getOrderById);

router.post('/', OrderController.addOrder);

router.put('/:id', OrderController.updateOrderById);

module.exports = router;
