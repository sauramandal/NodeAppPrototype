const { db } = require("./../db");
const sequelize = db.sequelize;

/**
 * Add cart item
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.addToCart = async (req, res) => {
  try {
    return await db.tb_cart.create({
      CustomerId: req.body.customerId,
      ProductId: req.body.productId,
      Quantity: req.body.quantity,
      CreatedBy: req.body.customerId
    });
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * Get all cart items
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.getCartItems = async (req, res) => {
  try {
    let sql = `SELECT C.id as cart_id, P.id as product_id, P.product_name as product_name, C.Quantity as product_quantity, P.product_price as product_price, P.product_description as product_description, P.product_image as product_image  
    FROM tb_cart C 
    INNER JOIN tb_product P 
    ON C.ProductId = P.id 
    WHERE C.CustomerId = :customer_id
    ORDER BY C.Id DESC`;

    let params = {
      replacements: {
        customer_id: req.params.customerid
      },
      type: sequelize.QueryTypes.SELECT
    };
    return await sequelize.query(sql, params);
  } catch (err) {
    throw err;
  }
};
