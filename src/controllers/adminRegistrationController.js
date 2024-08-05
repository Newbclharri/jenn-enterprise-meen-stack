/////////// ADMIN REGISTRATION CONTROLLER ///////////
const path = require('path');
const jwToken = require('jsonwebtoken');


//////////////// MIDDLEWARE ////////////////

exports.verifyAdminInviteToken = function (req, res, next) {
    const adminInviteToken = req.query.adminInviteToken;

    if (!adminInviteToken) {
        return res.status(401).send('Not Authorized to access this resource');
    }

    try {
        const token = jwToken.verify(adminInviteToken, secretKey);
    } catch (err) {
        console.log(`Invalid token ${err.stack}`)
        return res.status(401).send('Invalid or expired token');
    }

    next();

}