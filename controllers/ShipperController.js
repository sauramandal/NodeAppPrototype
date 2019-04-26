const ShipperService = require('../services/ShipperService');

exports.addShipperPage = async(req, res) => {
    res.render('shipper/AddShipper.ejs', {
        message: 'Adding a shipper page'
    });
}

exports.addShipper = async(req, res) => {
    try {
        
    } catch(err) {

    }
}