/////////// ADMIN REGISTRATION CONTROLLER ///////////

// Load .env file contents to process.env
require('dotenv').config();
const path = require('path');
const Admin = require(path.join(__dirname, '..', 'models', 'Admin'));

// Import json web token package
const jwToken = require('jsonwebtoken');

const { body, validationResult } = require('express-validator')


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
        const payload = jwToken.verify(adminInviteToken, secretKey);
        if (payload.role !== "Admin") {
            return res.send('Unauthorized');
        }
    } catch (err) {
        console.log(`Invalid token ${err.stack}`)
        return res.status(401).send('Invalid or expired token');
    }


    next();
}

////////////// GET REGISTRATION FORM ///////////
exports.registerAdmin = function (req, res) {
    return res.render('adminRegistration', {errors: [], stylesheet: '/assets/styles/adminRegistration.css' });
}

///////////// POST ADMIN REGISTRATION DATA /////////////

// Middleware
const verifyPassword = function(){
    return body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
        .matches(/(?=.*[0-9])/).withMessage('Password must contain a number.')
        .matches(/(?=.*[!@#$%^&*])/).withMessage('Password must contain a special character.')
        .matches(/(?=.*[A-Z])/).withMessage('Password must contain a capital letter.')
}

const handlePasswordErrors = function (req, res, next) {

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const errorMessages = errors.array().map(error => error.msg);
        return res.render('adminRegistration', {
            errors: errorMessages, 
            userData: req.body,
            stylesheet: '/assets/styles/adminRegistration.css'
        });
    }

    next();
}

const createAdmin = async function (req, res) {
    const admin = new Admin({
        firstName: req.body["first-name"],
        lastName: req.body["last-name"],
        email: req.body.email,
        username: req.body.email,
        password: req.body.password

    });

    try{

    }catch(err){

    }
    res.send(`Admin ${req.body["first-name"]} created successfully`)
}

exports.adminRegistrationPostMiddlewares = [verifyPassword(), handlePasswordErrors, createAdmin]