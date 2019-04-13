const {db}  = require('./../db');

exports.allOrders = (req, res) => {
  db.tb_order.findAll()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      console.log(error);
      res.status(404).send(error);
    })
}