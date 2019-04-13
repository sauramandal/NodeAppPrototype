const jwt = require('jsonwebtoken');
const config = require('../config');

var ensureToken = function(req, res, next) {
    console.log(req.cookies.token);

    var token = req.headers['x-access-token'] || req.headers['authorization'] || req.cookies.token;
    if(!token)
        return res.redirect('/signup');
    //verify secret
    jwt.verify(token, config.secret, function(err, decoded) {
        if(err) {
            return res.redirect('/signup');
        }
            // return res.status(500).send({auth: false, message: 'Failed to authenticate token'});
        //save to request
        //console.log(decoded.rows[0].first_name);
        req.userId = decoded.rows[0].user_id;
        req.token = token;
        next();
    });
    // const bearerHeader = req.headers['authorization'];
    // console.log(typeof bearerHeader);
    // if(typeof bearerHeader !== 'undefined') {
    //     const bearer = bearerHeader.split(" ");
    //     const bearerToken = bearer[1];
    //     req.token = bearerToken;
    //     console.log(req.token);
    //     next();
    // } else {
    //     res.render('users/signup.ejs',{
    //         title: 'Welcome to SignUp/Login page'
    //     });
    //     //res.sendStatus(403);
    // }
}

module.exports = {ensureToken};