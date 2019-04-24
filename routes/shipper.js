const router = require('express').Router();
const {ensureToken} = require('../middleware/ensureToken');
const ShipperController = require('../controllers/ShipperController');

router.get('/new', ShipperController.addShipperPage);

module.exports = router;