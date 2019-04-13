const {db}  = require('./../db');
const sequelize = db.sequelize;

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

exports.getTodayOrdersForCurrentUser = (req, res) => {
  let userId = req.params.id;
  let today = new Date().toISOString().split('T')[0];
  sequelize.query('SELECT TP.product_name, TP.product_price, TOD.QUANTITY\
                  FROM tb_order TORD\
                  INNER JOIN tb_order_details TOD \
                  ON TORD.ID = TOD.ORDER_ID\
                  INNER JOIN tb_product TP ON TP.id = TOD.PRODUCT_ID\
                  WHERE TORD.USER_ID = :usersId AND TORD.ORDER_DATE = :todaysDate', 
                  { 
                    replacements: 
                    {
                      usersId: userId,
                      todaysDate: today
                    }, 
                    type: sequelize.QueryTypes.SELECT 
                  }
  )
  .then(orders => {
    res.json(orders);
  })
  .catch(error => {
    console.log(error);
    res.status(404).send(error);
  }); 
}