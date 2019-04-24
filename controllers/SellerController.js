const SellerService = require('../services/SellerService');

exports.addSellerPage = async function(req, res) {
    res.render('seller/AddSeller.ejs', {
        message: 'Add a seller'
    });
}

exports.addSeller = async function(req, res) {
    try {
        var email = req.body.email;
        console.log(email);
        let isSellerExist = await SellerService.checkExistanceOfSeller(email);
        console.log(isSellerExist.length);
        if(!isSellerExist.length) {
            var newSeller = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                address: req.body.address,
                pincode: req.body.pincode,
                email: req.body.email,
                mobileNumber: req.body.mobileNumber,
                password: req.body.password,
                confirmPassword: req.body.confirmPassword
            };
            let seller = await SellerService.addNewSeller(newSeller);
            return res.json({
                seller
            });
        } else {
            return res.json({
                "message": "Seller already exist"
            });
        }
        //let seller = await SellerService.addNewSeller();
    } catch(err) {
        res.status(500).send(`unable to add a seller`);
    }
}