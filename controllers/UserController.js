const UserService = require("../services/UserService");

exports.login = async (req, res) => {
  //console.log(req.body);
  //var errors = validationResult(req);
  // if(!errors.isEmpty()) {
  //     res.status(400).json(errors.array());
  // }
  try {
    var post = {
      email: req.body.email,
      password: req.body.password
    };
    var isUserExisted = await UserService.userLoginCheckService(post);
    console.log(isUserExisted.length);
    if (isUserExisted.length) {
      var loggedIn = await UserService.userLogIn(isUserExisted);
      jwt.verify(loggedIn.token, config.secret, function(err, decoded) {
        if (err)
          return res
            .status(500)
            .send({ auth: false, message: "Failed to authenticate token" });
        //save to request
        req.userId = decoded.rows[0].user_id;
      });
      console.log(loggedIn.token);
      req.headers.authorization = "Bearer" + " " + loggedIn.token;
      const bearerHeader = req.headers["authorization"];
      console.log(typeof bearerHeader);
      if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        console.log(req.token);
        //next();
        return req;
      } else {
        return res;
      }
      //dashboard(req, res);
      // return res.json({
      //     "message": "logged in successfully",
      //     "error": false,
      //     "token": loggedIn.token
      // });

      // return res.render('index.ejs', {
      //     title: 'Dashboard',
      //     getRandomProducts,
      //     getTopTenProducts
      // });
    } else {
      return res;
    }
  } catch (err) {
    //handle error
    return res.json({
      message: "some error occured",
      error: err
    });
  }
};

exports.userlogin = async (req, res) => {
  try {
    var post = {
      email: req.body.email,
      password: req.body.password
    };
    var isUserExisted = await UserService.userLoginCheckService(post);

    if (isUserExisted.length) {
      var loggedIn = await UserService.userLogIn(isUserExisted);
      return res.json(loggedIn);
    } else {
      return res.json({
        message: "Email or password is invalid",
        error: true
      });
    }
  } catch (err) {
    //handle error
    return res.json({
      message: "some error occured",
      error: err
    });
  }
};

exports.createUser = async (req, res) => {

  try {
    return await UserService.createUser(req, res);
  } catch (err) {
    // handle error
    return res.json({
      message: "some error occured",
      error: err
    });
  }
};
