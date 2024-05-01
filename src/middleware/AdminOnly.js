/**
 * Check if user is admin before allowing access.
 * 
 * @param {String} adminRole - The Role of the admin as per the application.
 * @param {String} redirectUrl - The URL Unauthorized users will be redirected to.
 * @returns { next() || redirect() }
 */

exports.AdminOnly =(options={ fieldName, adminRole, redirectUrl }) => {
    const fieldName = options.fieldName || null 
    const adminRole = options.adminRole || null 
    const redirectUrl = options.redirectUrl || null 

    if( !fieldName || !adminRole || !redirectUrl || !options ) {
        throw 'Missing required fields in AdminOnly() middleware Function : "fieldName", "adminRole" and "redirectUrl".'
    } else {
        return async (req, res, next) => {
            res.locals[fieldName] == adminRole ? next() : res.redirect(redirectUrl)
            return;
        } 
    } 
}