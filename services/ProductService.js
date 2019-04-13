const mysql = require('mysql');
const {connection} = require('./../database');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const config = require('./../config');

module.exports = {
	addProduct: function(product) {
		return new Promise((resolve, reject) => {
			var queryString = "INSERT INTO ?? (`product_name`,`product_description`,`product_price`,`product_image`,\
								`created_at`,`company_id`,`category_id`) VALUES (?,?,?,?,?,?,?)";
			var table = ["tb_product"];
			var productObject = [ 
				product.product_name,
				product.product_description,
				product.product_price,
				product.product_image,
				product.created_at,
				product.company_id,
				product.category_id
			];
			queryString = mysql.format(queryString, table); console.log(queryString);
			connection.query(queryString, productObject, (err, rows) => {
				if(err) {
					return reject({
						"error": true,
						"message": "error in executing sql query"
					});
				}
				resolve({
					"error": false,
					"message": "query executed successfully"
				});
			});
		});		
	},

	getCompanies: function() {
		console.log('Hi');
		return new Promise((resolve, reject) => {
			let queryString = "SELECT id, company_name FROM ??";
			let table = ["tb_company"];
			queryString = mysql.format(queryString, table);
	
			connection.query(queryString, (err, rows) => {
				if(err) {
					return reject(new Error(err));
				} 
				//console.log(rows);
				resolve(rows);
			});
		});
	},

	getCategories: function() {
		return new Promise((resolve, reject) => {
			let queryString = "SELECT id, CATEGORY_NAME FROM ??";
			let table = ["tb_category"];
			queryString = mysql.format(queryString, table);
			connection.query(queryString, (err, rows) => {
				if(err) {
					return reject(err);
				}
				//console.log(rows);
				resolve(rows);
			});
		});
	},

	editProduct: function(productId) {
		return new Promise((resolve, reject) => {
			let queryString = "SELECT * FROM ?? WHERE id = ?";
			let table = ["tb_product"];
			queryString = mysql.format(queryString, table);
			connection.query(queryString, productId, (err, rows) => {
				if(err) {
					return reject({
						"error": true,
						"message": "query failed execution"
					});
				} 
				resolve({
					"error": false,
					"message": "executed successfully",
					"products": rows
				});
			});
		});
	}, 

	showProduct: function(productId) {
		return new Promise((resolve, reject) => {
			let queryString = "SELECT * FROM ?? WHERE id = ?";
			let table = ["tb_product"];
			queryString = mysql.format(queryString, table);
			connection.query(queryString, productId, (err, rows, fields) => {
				if(err) {
					return reject(new Error("Query execution failed"));
				}
				resolve(rows);
			});
		});
	}, 

	getOrderId: function(userId) {
		return new Promise((resolve, reject) => {
			let queryString = "SELECT ID FROM ?? WHERE ?? = ? AND ?? = ?";
			let tableValues = ["tb_order", "USER_ID", userId, "ORDER_PLACED", 0];
			queryString = mysql.format(queryString, tableValues);
			connection.query(queryString, (err, rows) => {
				if(err) {
					reject({
						"message": "err in query execution",
						err 
					});
				}
				resolve(rows);
			});
		});
	},

	checkExistingProductOrder: function(orderId, productId) {
		return new Promise((resolve, reject) => {
			let queryString = "SELECT COUNT(?) FROM ?? WHERE ?? = ? AND ?? = ?";
			let tableValues = ["id", "tb_order_details", "ORDER_ID", orderId, "PRODUCT_ID", productId];
			queryString = mysql.format(queryString, tableValues);
			connection.query(queryString, (err, rows) => {
				if(err) {
					reject({
						"message": "err in query execution",
						err 
					});
				}
				resolve(rows);
			});
		});
	},

	getAllCartItems: function(orderId) {
		return new Promise((resolve, reject) => {
			//grab all the product details for the current order
			let queryString = "SELECT TP.PRODUCT_NAME, TP.PRODUCT_DESCRIPTION, TP.PRODUCT_PRICE, TOD.QUANTITY, TP.PRODUCT_PRICE, TP.PRODUCT_IMAGE\
								FROM tb_order_details TOD\
								INNER JOIN tb_product TP\
								ON TP.ID = TOD.PRODUCT_ID\
								WHERE TOD.ORDER_ID = ?";
			let tableValues = [orderId];
			queryString = mysql.format(queryString, tableValues);
			connection.query(queryString, (err, rows) => {
				console.log(rows);
				if(err) {
					reject({
						"message" : "error in query execution",
						err
					});
				}
				resolve(rows);
			});
		});
	},

	addOrder: function(userId, orderDate, orderAmount, isPlaced) {
		return new Promise((resolve, reject) => {
			let queryString = "INSERT INTO ?? (`USER_ID`,`ORDER_DATE`,`ORDER_AMOUNT`,`ORDER_PLACED`) VALUES (?,?,?,?)";
			let tableValues = ["TB_ORDER", userId, orderDate, orderAmount, isPlaced];
			queryString = mysql.format(queryString, tableValues);
			connection.query(queryString, (err, rows) => {
				if(err) {
					reject({"message": "err in query execution"});
				}
				resolve(rows);
			});
		});
	},

	addOrderDetails: function(orderId, productId, quantity, price) {
		return new Promise((resolve, reject) => {
			console.log('Hi');
			let queryString = "INSERT INTO ?? (`ORDER_ID`,`PRODUCT_ID`,`QUANTITY`,`PRICE`) VALUES(?,?,?,?)";
			let tableValues = ["tb_order_details", orderId, productId, quantity, price];
			queryString = mysql.format(queryString, tableValues);
			connection.query(queryString, (err, rows) => {
				if(err) {
					reject({
						"message" : "err in query execution"
					});
				}
				resolve(rows);
			});
		});
	},

	addProductsToCart: function(productId, userId, quantity, price) {
		return new Promise((resolve, reject) => {
			let queryString = "SELECT COUNT(user_id) FROM ?? WHERE ? = ??; ";
		});
	}
}