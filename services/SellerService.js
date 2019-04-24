const {db}  = require('./../db');
const sequelize = db.sequelize;

exports.addNewSeller = async(req, res) => {
    try {
        var newSeller = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            pincode: req.body.pincode,
            email: req.body.email,
            mobileNumber: req.body.mobileNumber,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        };
        var addedSeller;
        //check for existing user
        let sqlEmailCheck = 'SELECT Email FROM tb_seller WHERE Email = :userEmail';
        let sqlEmailCheckParams = {
            replacements: {
                userEmail: req.body.email
            }
        };
        sequelize.query(sqlEmailCheck, sqlEmailCheckParams).then(([results, metadata]) => {
            console.log(metadata);
            
        });
        let sql = 'INSERT INTO tb_seller(FirstName, LastName, Address, Mobile, Pincode, Email, Password, ConfirmPassword, ActiveFlag)\
                    VALUES (:firstname, :lastname, :address, :mobile, :pincode, :email, , :password, :confirmpassword, :activeflag)';
        let params = {
            replacements:
            {
                firstname: newSeller.firstName,
                lastName: newSeller.lastName,
                address: newSeller.address,
                mobile: newSeller.mobileNumber,
                pincode: newSeller.pincode,
                email: newSeller.email,
                password: newSeller.password,
                confirmPassword: newSeller.confirmPassword,
                activeflag: 1
            },
        };

        addedSeller = await sequelize.query(sql, params);
        return addedSeller.metadata;
        
    } catch(err) {
        throw err;
    }
}