// Functions
const { jwtSign, setJwtCookie } = require('../jwt/jwtSign')

/**
 * 
 * @param {Object} fields - Contains fields - Username and Password for Login.
 * @param {Schema} Schema - The MongoDB Schema of the User Model.
 * @param {Object} response - The HTTP Response object from Express.js.
 * 
 * @return {Promise} A Promise that resolves when the login is complete or rejects if an error occurs during login
 * 
 * @error 101 - No/Incorrect fields were provided
 * @error 102 - No User Found with provided details
 * @error 103 - Incorrect Password
 * @error 104 - Schema not supplied
 * @error 109 - Incomplete Arguments Supplied
 *  
 */
const error = {
    101: {
        message: "Authentication System Error || No/Incorrect fields were provided",
        code: 101
    },
    102: {
        message: "Authentication System Error || No User Found with provided details",
        code: 102
    },
    103: {
        message: "Authentication System Error || Incorrect Password",
        code: 103
    },
    104: {
        message: "Authentication System Error || Schema not supplied",
        code: 104
    },
    109: {
        message: "Unknown Error || Incomplete Arguments Supplied",
        code: 109
    }
}


exports.loginUser = async (options={fields: {}, Schema, response}) => {

    const loginID = options.fields[uniqueLoginField] || null
    const loginPassword = options.fields.password || null;
    
    return new Promise(async (resolve, reject) => {
        if(!options.Schema) {
            reject(error[104]);
            return;
        }
        
        if (!loginID || !loginPassword || !options.fields) {
            reject(error[101]);
            return;
        }
        
        try {
            // Check for user in DB
            const check = await options.Schema.findOne({ [uniqueLoginField]: loginID })
            
            // ! If no user found
            if (!check) {
                reject(error[102]);
                return;
            }
            
            // Compare password
            // ! password incorrect
            if (check.password != loginPassword) {
                reject(error[103]);
                return;
            }
    
            // All good - username + password correct
            if (check.password == loginPassword) {
                // ** Sucessful Login **
                jwtSign(check, options.response) 
                resolve({ code: 200, message: "Login Successful", userdata: check });
                return; 
            }
            
        } catch (error) {
            // ! Unknown Error Login
            console.log(error)
            reject(error[109]);
            return; 
        }
    })
}
