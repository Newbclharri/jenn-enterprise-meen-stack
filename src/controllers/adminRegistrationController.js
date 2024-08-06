/////////// ADMIN REGISTRATION CONTROLLER ///////////

// Load .env file contents to process.env
require('dotenv').config();

// Import json web token package
const jwToken = require('jsonwebtoken');


//////////////// MIDDLEWARE ////////////////

/**
 * Middleware function to verify the admin invite token from the request query.
 * If the token is missing, invalid, or expired, a 401 Unauthorized response is sent.
 * 
 * @function verifyAdminInviteToken
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function to call if the token is valid.
 * @returns {Object} - Sends a response to the client, either a 401 status or calls the next middleware.
 * 
 * @throws {Error} Throws an error if the token verification fails.
 */

exports.verifyAdminInviteToken = function (req, res, next) {
    const adminInviteToken = req.query.token;

    if (!adminInviteToken) {
        return res.status(401).send('Not Authorized to access this resource');
    }

    try {
        const secretKey = process.env.SECRET_KEY;
        const token = jwToken.verify(adminInviteToken, secretKey);
    } catch (err) {
        console.log(`Invalid token ${err.stack}`)
        return res.status(401).send('Invalid or expired token');
    }

    next();

}