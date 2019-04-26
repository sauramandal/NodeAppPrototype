const OrderService = require('../services/OrderService');

exports.getTodaysOrder = async function(req, res) {
    let userId = req.params.id;
    // add validation
    let today = new Date().toISOString().split('T')[0];
    try {
        let orders = await OrderService.getTodayOrdersForCurrentUser(userId, today);
        return res.json({
            orders: orders
        });
    } catch(err) {
        // handle error
        res.status(500).send(`unable to find order for today's data`);
    }
}

exports.getAllOrders = async function(req, res) {
    try {
        let allOrders = await OrderService.getAllOrders();
        return res.json({
            orders: allOrders
        });
    } catch(err) {
        console.log(err);
        res.status(500).send(`unable to find order`);
    }
}

exports.addOrder = async function(req, res) {
    try {
        let result = await OrderService.addOrder(req, res);
        return res.json({
            result: result
        });
    } catch(err) {
        console.log(err);
        res.status(500).send(`unable to add order`);
    }
}


exports.getOrderById = async function(req, res) {
    try {
        let result = await OrderService.getOrderById(req, res);
        return res.json({
            result: result
        });
    } catch(err) {
        console.log(err);
        res.status(500).send(`unable to find order`);
    }
}

exports.updateOrderById = async function(req, res) {
    try {
        let result = await OrderService.updateOrderById(req, res);
        return res.json({
            result: result
        });
    } catch(err) {
        console.log(err);
        res.status(500).send(`unable to find order`);
    }
}