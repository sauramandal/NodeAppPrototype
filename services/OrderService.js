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

exports.getAllOrders = async(req, res) => {
  try {
    return await db.tb_order.findAll({ limit: 10 });
  } catch(err) {
    throw new Error(err);
  }
}

exports.getTodayOrdersForCurrentUser = async (userId, date) => {
  let sql = 'SELECT TP.product_name, TP.product_price, TOD.QUANTITY\
  FROM tb_order TORD\
  INNER JOIN tb_order_details TOD \
  ON TORD.ID = TOD.ORDER_ID\
  INNER JOIN tb_product TP ON TP.id = TOD.PRODUCT_ID\
  WHERE TORD.USER_ID = :usersId AND TORD.ORDER_DATE = :todaysDate';
  let params = { 
    replacements: 
    {
      usersId: userId,
      todaysDate: date
    }, 
    type: sequelize.QueryTypes.SELECT 
  };
  try {
    return await sequelize.query(sql, params);
  } catch(err) {
    throw err;
  }
}