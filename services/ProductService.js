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
			var table = ["TB_PRODUCT"];
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
			let table = ["TB_COMPANY"];
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
			let table = ["TB_CATEGORY"];
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
			let table = ["TB_PRODUCT"];
			queryString = mysql.format(queryString, table);
			connection.query(queryString, productId, (err, rows) => {
				if(err) {
					return reject({
						"error": true,
						"message": "query successfully executed"
					});
				} 
				resolve({
					"error": false,
					"message": "executed successfully",
					"products": rows
				});
			});
		});
	}
}