const SellerService = require('../services/SellerService');

exports.addSellerPage = async function(req, res) {
    res.render('seller/AddSeller.ejs', {
        message: 'Add a seller'
    });
}

exports.addSeller = async function(req, res) {
    try {
        let seller = await SellerService.addNewSeller();
        return res.json({seller});
    } catch(err) {
        res.status(500).send(`unable to add a seller`);
    }
}