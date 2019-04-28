const router = require('express').Router();
const {ensureToken} = require('../middleware/ensureToken');
const SellerController = require('./../controllers/SellerController');

router.get('/new', SellerController.addSellerPage);
router.post('/new', SellerController.addSeller);

module.exports = router;
