const router = require('express').Router();
const ProductService = require('../services/ProductService');
const connection = require('../database');

router.get('/addProduct', (req, res) => {
	res.render('product/add-product.ejs', {
		title: 'Add a new product',
		message: ''
	});
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

	var product = {
		product_name: req.body.product_name,
		product_description: req.body.product_description,
		product_price: req.body.product_price,
		product_image: imageName,
		created_at: date
	};

	//check filetype before uploading it on server
	if(uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || 
		uploadedFile.mimetype === 'image/gif') {

		//upload file to /public/assets/img/${imageName}
		uploadedFile.mv(`public/assets/img/${imageName}`, (err) => {
			if(err) {
				return res.status(500).send(err);
			}
			ProductService
				.addProduct(product)
				.then((res) => {
					return res.redirect('/');
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
		.then((res) => {
			res.render('product/edit-product.ejs', {
				title: 'Edit Player',
				players: res.products
			});
		})
		.catch((err) => {
			return res.status(500).send(err);
		});
});

module.exports = router;