const mysql = require('mysql');
const {connection} = require('./../database');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const config = require('./../config');


exports.checkExistanceOfSeller = (email) => {
    
    return new Promise((resolve, reject) => {
        console.log(email);
        let sqlEmailCheck = "SELECT Email FROM tb_seller WHERE Email = ?";
        connection.query(sqlEmailCheck, [email], (err, rows, fields) => {
            console.log(rows);
            if(err) {
                return reject(new Error(err));
            }
            resolve(rows);
        });
    });
}

exports.addNewSeller = (newSeller) => {
    return new Promise((resolve, reject) => {
        let sql = 'INSERT INTO tb_seller(FirstName, LastName, Address, Mobile, Pincode, Email, Password, ConfirmPassword, ActiveFlag)\
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        let replacementsParams = [
            newSeller.firstName,
            newSeller.lastName,
            newSeller.address,
            newSeller.mobileNumber,
            newSeller.pincode,
            newSeller.email,
            newSeller.password,
            newSeller.confirmPassword,
            1
        ];

        sql = mysql.format(sql, replacementsParams);
        connection.query(sql, replacementsParams, (err, rows) => {
            if(err) {
                return reject(new Error(err));
            }
            resolve(rows);
        });
    });
}