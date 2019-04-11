const router = require('express').Router();
const OrderService = require('../services/OrderService');

router.get('/orders', async (req, res) => {
	try {
		//steps to happen concurrently asynchronous using Promise.all
		let [ orders ] = await Promise.all([
			OrderService.getOrders()
		]);
		
		return res.send(orders);
	} catch(err) {
		// log error to file and return a 404 page not found
		return res.render('error', {
			message: 'Ooops'
		});
    }
});

module.exports = router;
