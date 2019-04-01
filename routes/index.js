const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const {connection} = require('./../database');
const config = require('./../config');
const IndexService = require('../services/IndexService');

var dashboard = async(req, res) => {
    try {
        var showTopTenProducts;
        var showBestRatedProducts;
        var showProductsBasedOnYourViews;
        let [ getRandomProducts, getTopTenProducts ] = await Promise.all([
            IndexService.getRandomizedProducts(),
            IndexService.getTopTenSoldProducts()
        ]);
        res.render('index.ejs', {
            title: 'Dashboard',
            getRandomProducts,
            getTopTenProducts
        });
    } catch(err) {
        return res.render('error', {
            message: 'Error occurred'
            
        });
    }
    
};

module.exports = {dashboard};