// Functions
const { jwtSign, setJwtCookie } = require('../jwt/jwtSign')

/**
 * Registers new user to database, signs a JWT Cookie and sends it back in response. 
 * 
 * @param {Object} fields - Contains all the fields that are there in the registration form according to the schema of the database.
 * @param {Schema} Schema - The MongoDB Schema of the User Model.
 * @param {Object} response - The HTTP Response object from Express.js.
 * 
 * @return {Promise} A Promise that resolves when the registration is complete or rejects if an error occurs during registration
 * 
 * @error Codes
 *  101 = Username is already in use
 *  102 = Schema not supplied
 *  103 = Incomplete Arguments Supplied 
 */

const error = {
    101: {
        message: "Authentication System Error || Username already in Use",
        code: 101
    },
    102: {
        message: "Authentication System Error || Schema not supplied",
        code: 103
    },
    109: {
        message: "Unknown Error || Incomplete Arguments Supplied",
        code: 109
    }
}

exports.registerUser = async (options={fields: {}, Schema, response}) => {
    return new Promise(async(resolve, reject) => {
        if(!options.Schema) {
            reject(error[103]);
            return;
        }
        // Check if username is in use.
        const checkUsernameAvailable = await options.Schema.find({ username:  options.fields.username })
        if (checkUsernameAvailable.length > 0) {
            return reject(error[101])
        }
        
        try {
            await options.Schema.create(options.fields)
                .then((user) => {
                    jwtSign(user, options.response) 
                    return resolve({ code: 200, message: "Registration Successful", userdata: user });
                })
        }
        catch (err) {
            console.log(err)
            return reject(error[109])
            
        }
    })
}