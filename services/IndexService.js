const mysql = require('mysql');
const {connection} = require('./../database');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const config = require('./../config');

module.exports = {
    getTopTenSoldProducts: function() {
        return new Promise((resolve, reject) => {
            var queryString = "SELECT * FROM ?? LIMIT 10";
            var values = ["tb_product"];
            connection.query(queryString, values, (err, rows, fields) => {
                if(err)
                    return reject(new Error(""));
                return resolve(rows);
            });
        });
    },

    getRandomizedProducts: function() {
        return new Promise((resolve, reject) => {
            var queryString = "SELECT * FROM ?? LIMIT 5";
            var values = ["tb_product"];
            connection.query(queryString, values, (err, rows, fields) => {
                if(err)
                    return reject(new Error(""));
                return resolve(rows);
            });
        });        
    }
};