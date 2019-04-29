const CartService = require('../services/CartService');

exports.addToCart = async function(req, res) {
    try {
        let result = await CartService.addToCart(req, res);
        return res.json({
            status: "success",
            result: result
        });
    } catch(err) {
        console.log(err);
        res.status(400).send(`unable to add`);
    }
}

exports.getCartItems = async function(req, res) {
    try {
        let results = await CartService.getCartItems(req, res);
        return res.json({
            status: "success",
            results: results
        });
    } catch(err) {
        console.log(err);
        res.status(400).send(`unable to get cart`);
    }
}