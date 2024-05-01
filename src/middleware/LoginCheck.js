/**
 * Check if user is Logged in or not.
 * 
 * @returns { next() } - Assings Variables to res.locals according the the cookieFields set during the setup main function.
 */
const jwt = require('jsonwebtoken');

exports.LoginCheck = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, jwtSecretKey, (err, decodedToken) => {
            if (err) {
                console.log(err)
                return res.status(401).send("Unknown Error | Kindly clear all cookies from your browser then access the page")
            }

            else {
                let allFields = {}
                for (const key of Object.keys(cookieFields)) {
                    allFields[key] = decodedToken[key];
                }
                res.locals = allFields;
                return next();
            }
        })
    }
    else {
        res.locals.role = "default"
        next()
    }
}