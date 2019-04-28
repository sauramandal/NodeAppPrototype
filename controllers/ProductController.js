const ProductService = require('../services/ProductService');

exports.getProducts = async function(req, res) {
    try {
        let products = await ProductService.getProducts(req, res);
        return res.json({
            status: 'success',
            results: products
        });
    } catch(err) {
        console.log(err);
        res.status(500).send(`unable to find products`);
    }
}