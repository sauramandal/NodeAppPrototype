const {sequelize} = require('./../database');


module.exports = {
    getOrders: function() {
        return new Promise((resolve, reject) => {
            sequelize.query("SELECT * FROM tb_order").then(result => {
                console.log(result);
                resolve({
                    result
                  });
              });
        });
      },
}