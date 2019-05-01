const router = require('express').Router();
const ProductService = require('../services/ProductService');
const mysql = require('mysql');
const {connection} = require('./../database');
const md5 = require('md5');
const config = require('./../config');
const fileUpload = require('express-fileupload');
const {ensureToken} = require('../middleware/ensureToken');
const UserService = require('./../services/UserService');

router.get('/addCategory', async(req, res) => {
	try {
		res.render('product/addCategory.ejs', {
			title: 'Add a category'
		});
	} catch(err) {
		return res.render('errorPage', {
			message: 'Resource not found'
		})
	}
});

router.post('/addCategory', async(req, res) => {
	try {
		let categoryName = req.body.category_name;
		let categoryDesc = req.body.category_description;
		let addedCategory = ProductService.addCategory(categoryName, categoryDesc);
		return res.json(JSON.stringify(addedCategory));
	} catch(err) {
		return res.json({
			message: 'Error occurred',
			error: err
		});
	}
});

router.get('/addProduct', async (req, res) => {
	try {
		//steps to happen concurrently asynchronous using Promise.all
		let [ companies, categories ] = await Promise.all([
			ProductService.getCompanies(),
			ProductService.getCategories()
		]);

		return res.render('product/add-product.ejs', {
			title: 'Add a product',
			companies,
			categories
		});
	} catch(err) {
		// log error to file and return a 404 page not found
		return res.render('error', {
			message: 'Ooops'
		});
	}

	//method 2
	/*
	const promiseArr = [
		ProductService.getCompanies(),
		ProductService.getCategories()
	];

	Promise
	.all(promiseArr)
	.then(result => {
		let companies = result[0];
		let categories = result[1];
		console.log(companies); console.log(categories);
		return res.render('product/add-product.ejs', {
			title: 'Add a product',
			companies,
			categories
		});
		//return res.view();
	})
	.catch(err => {
		return res.render('error_page', {
			message: ''
		});
	}); */

});

router.get('/addProductDetails', async(req, res) => {
	try {
		res.render('product/addProductDetails.ejs', {
			title: 'Add product details'
		});
	} catch(err) {
		return res.status(500).send("Error in rendering");
	}
});

//API to search products based on relevant string match
router.get('/search', async(req, res) => {
	try {
		connection.query('SELECT id, product_name FROM tb_product WHERE product_name LIKE "%' + req.query.query +'%"', function(err, rows, fields) {
			if(err) {
				throw new Error("Error occurred while executing query");
			}	
			let data = [];
			for(var i=0;i<rows.length;i++) {
				data.push(rows[i].product_name+','+rows[i].id);
			}
			res.send(JSON.stringify(data));
		});
	} catch(err) {
		return res.status(500).send("Error");
	}
});

//route to add product details
router.post('/addProductDetails', async(req, res) => {
	console.log(req.body);
	return res.json(JSON.stringify(req.body));
});

router.post('/addProduct', (req, res) => {
	if(!req.files) {
		return res.status(400).send("No files were uploaded");
	}
	var date = new Date();
	var uploadedFile = req.files.product_image;
	var image_name = uploadedFile.name;
	var fileExtension = uploadedFile.mimetype.split('/')[1];
	imageName = req.body.product_name + '.' + fileExtension;
	console.log(req.body);
	var product = {
		product_name: req.body.product_name,
		product_description: req.body.product_description,
		product_price: req.body.product_price,
		product_image: imageName,
		created_at: date,
		company_id: req.body.company,
		category_id: req.body.category
	};
	console.log(product);
	//check filetype before uploading it on server
	if(uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' ||
		uploadedFile.mimetype === 'image/gif') {

		//upload file to /public/assets/images/${imageName}
		uploadedFile.mv(`public/assets/images/${imageName}`, (err) => {
			if(err) {
				return res.status(500).send(err);
			}

			ProductService
				.addProduct(product)
				.then((response) => {
					console.log('Resolved');
					return res.status(200).send({"message": "OK"});
				})
				.catch((err) => {
					return res.status(500).send(err);
				});
		});
	}
	else {
		message = "Invalid file format";
		res.render('product/add-product.ejs', {
			message,
			title: 'Add a product'
		});
	}
});



router.get('/:id/editProduct', (req, res) => {
	let productId = req.params.id;
	ProductService
		.editProduct(productId)
		.then((result) => {
			res.render('product/edit-product.ejs', {
				title: 'Edit Player',
				players: result.products
			});
		})
		.catch((err) => {
			return res.status(500).send(err);
		});
});

router.get('/:id/show', ensureToken, async(req, res) => {
	try {
		var productId = req.params.id;
		var userId = req.userId;

		//get userData from userId
		var userData = await UserService.showUserData(userId);
		//console.log(userData[0].first_name);
		if(userData) {
			let prodDetails = await ProductService.showProduct(productId);
			console.log(prodDetails);
			if(prodDetails) {
				return res.render('product/ShowProduct.ejs', {
					title: 'Show product details',
					productDetails: prodDetails,
					userData,
					userId,
					productId
				});
			}
			return res.json({"message": 'unable to show product'});
		} else {
			return res.json({"message": 'no user exist'});
		}
	} catch(e) {
		return res.json({
			"message": 'An exception occurred',
			"details": e
		});
	}
});

router.get('/addToCart', ensureToken, async(req, res) => {
	try {
		var productId = req.query.ProductId;
		var userId = req.query.UserId;
		var quantity = req.query.quantity;
		var currentOrderAmount = req.query.ProductPrice;
		var price;
		var totalDiscountedPrice = 0.0;
		//update orders table iff user_id is not present in orders table
		var getOrderId = await ProductService.getOrderId(userId);

		if(getOrderId.length == 0) {
			//Add current order

			var orderDate = new Date();
			var orderAmount = 0;
			var isPlaced = false;
			//console.log(userId); console.log(orderDate); console.log(currentOrderAmount); console.log(isPlaced);
			var addedOrder = await ProductService.addOrder(userId, orderDate, currentOrderAmount, isPlaced);
			console.log(addedOrder);
		} else {
			console.log(getOrderId);
			var currentOrderId = getOrderId[0].ID;
			//block duplicate orders from same user
			var isProductRepeated = await ProductService.checkExistingProductOrder(currentOrderId, productId);
			if(isProductRepeated) { //show cart items
				console.log('Repeated');
			}
			else {
				var addAndUpdateOrderDetails = await ProductService.addOrderDetails(currentOrderId, productId, quantity, currentOrderAmount);
			}
		}
		//get all the cart items of current user and show it
		var showCartItems = await ProductService.getAllCartItems(currentOrderId);
		console.log(showCartItems);
		//get user data
		var userData = await UserService.showUserData(userId);
		return res.render('product/ShowCart.ejs', {
			cartItems: showCartItems,
			userData
		});
	} catch(exception) {
		return res.json({
			"message" : "An exception occurred",
			"details": exception
		});
	}
});

router.get('/showCartItems', ensureToken, async(req, res) => {
	//console.log(req.userId);
	//get current user's cart items
	try {
		var userId = req.userId;
		var currentOrderId = await ProductService.getOrderId(req.userId);
		var orderId = currentOrderId[0].ID;
		var showCartItems = await ProductService.getAllCartItems(orderId);
		//get user data
		var userData = await UserService.showUserData(userId);
		return res.render('product/ShowCart.ejs', {
			cartItems: showCartItems,
			userData
		});
	} catch(e) {
		return res.json({
			"message": "An exception occurred",
			"details": e
		});
	}

});

module.exports = router;
