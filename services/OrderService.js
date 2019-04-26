const { db } = require("./../db");
const sequelize = db.sequelize;

exports.addOrder = (req, res) => {
  let today = new Date().toISOString().split('T')[0];

  db.tb_order
    .create({
      USER_ID: req.body.USER_ID,
      ORDER_DATE: today,
      ORDER_AMOUNT: req.body.ORDER_AMOUNT,
      ORDER_PLACED: req.body.ORDER_PLACED,
      DELIVERY_ADDRESS: req.body.DELIVERY_ADDRESS,
      SHIPPER_ID: req.body.SHIPPER_ID
    })
    .then(res.status(200).send("Order add successfully"))
    .catch(error => {
      res.status(400).send(error);
    });
};

exports.allOrders = (req, res) => {
  db.tb_order
    .findAll()
    .then(orders => {
      res.json(orders);
    })
    .catch(error => {
      console.log(error);
      res.status(404).send(error);
    });
};

exports.getAllOrders = async (req, res) => {
  try {
    return await db.tb_order.findAll({ limit: 10 });
  } catch (err) {
    throw new Error(err);
  }
};

exports.getOrderById = async (req, res) => {
  try {
    return await db.tb_order.findOne({
      where: {
        ID: req.params.id
      }
    });
  } catch (err) {
    throw new Error(err);
  }
};

exports.updateOrderById = async (req, res) => {
  let order = {
    USER_ID: req.body.USER_ID,
    ORDER_DATE: req.body.ORDER_DATE,
    ORDER_AMOUNT: req.body.ORDER_AMOUNT,
    ORDER_PLACED: req.body.ORDER_PLACED,
    DELIVERY_ADDRESS: req.body.DELIVERY_ADDRESS,
    SHIPPER_ID: req.body.SHIPPER_ID
  };

  try {
    return await db.tb_order
      .update(order, {
        where: {
          ID: req.params.id
        }
      });
  } catch (err) {
    throw new Error(err);
  }
};

exports.getTodayOrdersForCurrentUser = async (userId, date) => {
  let sql =
    "SELECT TP.product_name, TP.product_price, TOD.QUANTITY\
  FROM tb_order TORD\
  INNER JOIN tb_order_details TOD \
  ON TORD.ID = TOD.ORDER_ID\
  INNER JOIN tb_product TP ON TP.id = TOD.PRODUCT_ID\
  WHERE TORD.USER_ID = :usersId AND TORD.ORDER_DATE = :todaysDate";
  let params = {
    replacements: {
      usersId: userId,
      todaysDate: date
    },
    type: sequelize.QueryTypes.SELECT
  };
  try {
    return await sequelize.query(sql, params);
  } catch (err) {
    throw err;
  }
};
