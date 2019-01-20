const jwt = require('jsonwebtoken');
const config = require('../config');

var ensureToken = function(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    console.log(typeof bearerHeader);
    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        console.log(req.token);
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = {ensureToken};