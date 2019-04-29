const router = require('express').Router();
const CartController = require('../../controllers/CartController');

router.post('/', CartController.addToCart);

router.get('/:customerid', CartController.getCartItems);

module.exports = router;
