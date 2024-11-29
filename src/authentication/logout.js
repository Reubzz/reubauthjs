/**
 * 
 * @param {Object} response - Contains the Express Response Object.
 * 
 * @return Removes and deletes the JWT Cookie hence logging out the user.
 * 
 */

exports.logoutUser = async (options={response}) => {
    
    return new Promise(async (resolve, reject) => {
        try{
            options.response.cookie("jwt", "", { maxAge: "-1", sameSite: 'lax'  })
            options.response.location(req.get("Referrer") || "/")
            resolve({ code: 200, message: "Logged Out User" })
        } catch(error) {
            console.log(error)
            reject({ code: 102, message: "Authentication System Error || Couldn't Logout User, No Login Cookie Exists." })
        }
    })
}
