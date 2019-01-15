const jwt = require('jsonwebtoken');
const config = require('./../config');

var verifyToken = (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['token'];
    if(token) {
        //verify token
        jwt.verify(token, config.secret, (err, currUser) => {
            if(err) { res.send(err); }
            else {
                req.currUser = currUser;
                next();
            }
        });
    } else {
        //send a 401 not found
        res.status(401).send("Invalid access");
    }
};

module.exports = {verifyToken};