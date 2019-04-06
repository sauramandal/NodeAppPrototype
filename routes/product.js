const router = require('express').Router();
const ProductService = require('../services/ProductService');
const mysql = require('mysql');
const {connection} = require('./../database');
const md5 = require('md5');
const config = require('./../config');
const fileUpload = require('express-fileupload');

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

router.get('/:id/show', (req, res) => {
	let productId = req.params.id;
	ProductService
		.showProduct(productId)
		.then((result) => {
			res.render('product/ShowProduct.ejs', {
				title: 'Show product details',
				productDetails: result
			});
		})
		.catch((err) => {
			return res.status(500).send(err);
		});
});

router.post('/addToCart', (req, res) => {
	let productId = req.body.ProductId;
	let userId = req.body.UserId;
	let quantity;
	let price; 
	let totalDiscountedPrice = 0.0;
	ProductService
		.addProductsToCart(productId, userId, quantity, price)
		.then((result) => {

		})
		.catch((err) => {
			
		});
	
});

module.exports = router;
