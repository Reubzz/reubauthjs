const jwt = require('jsonwebtoken');

exports.jwtSign = (user, res) => {
    try {
        let allFields = {}
        for (const key of Object.keys(cookieFields)) {
            allFields[key] = user[key];
        }
        const token = jwt.sign(
            allFields,
            jwtSecretKey,
            { expiresIn: loginExpiryIn }
        );
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: loginExpiryIn * 1000,
            sameSite: 'lax'
        })
        return token;
    } catch (error) {
        console.log('error jwtSign() in jwtSign.js', error.message)
    }
}

// exports.setJwtCookie = (token, res) => {
//     try {
//         res.cookie('jwt', token, {
//             httpOnly: true,
//             maxAge: expiresIn * 1000,
//             sameSite: 'lax'
//         })
//     }
//     catch (error) {
//         console.log('error jwtSign() in jwtSign.js', error.message)
//     }

// }