const { loginUser } = require("./src/authentication/login")
const { registerUser } = require("./src/authentication/register")
const { deleteUser } = require("./src/authentication/delete")
const { logoutUser } = require("./src/authentication/logout")
const { jwtSign } = require("./src/jwt/jwtSign")
const { LoginCheck } = require("./src/middleware/LoginCheck")
const { AdminOnly } = require("./src/middleware/adminOnly")
const mongoose = require('mongoose')

module.exports = function(options={dbUri, jwtSecretKey, cookieFields: {}, loginExpiryIn }) {
    try {
        mongoose.connect(options.dbUri)
            .then(() => {
                console.log("Authentication System Connected to Database")
            })
            .catch((error) => {
                throw "Authentication System || Database Error - Couldn't connect to Database : " + error;
            })

        mongoose.connection.on("error", (err) => { 
            throw "Authentication System || Database Connection Lost" + err;
        })

        // ! Create global varaibles
        global.dbUri = options.dbUri;
        global.jwtSecretKey = options.jwtSecretKey;
        global.cookieFields = options.cookieFields;
        global.loginExpiryIn = options.loginExpiryIn;


        // Create Modules
        let module = {};

        // Core Authenticaion Functions
        module.login = loginUser;
        module.jwtSign = jwtSign;
        module.register = registerUser;
        module.delete = deleteUser;
        module.logout = logoutUser;
        
        // Middleware Functions
        module.LoginCheck = LoginCheck;
        module.AdminOnly = AdminOnly;
        
        return module;
    } catch (error) {
        throw "Authentication System || Database Error - Couldn't connect to Database : " + error; 
    }
}