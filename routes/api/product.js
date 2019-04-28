const router = require('express').Router();
const ProductController = require('../../controllers/ProductController');

router.get('/', ProductController.getProducts);

module.exports = router;
