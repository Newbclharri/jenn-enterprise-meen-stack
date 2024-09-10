/////////// ADMIN INVTTE CONTROLLER ///////////

require('dotenv').config();
const path = require('path');
const jwToken = require('jsonwebtoken');
const approvedAdminEmailModel = require(path.join(__dirname, '..', 'models', 'ApprovedAdminEmail'));
const Admin = require(path.join(__dirname, '..', 'models', 'Admin'));
const sgMail = require('@sendgrid/mail');

/////////////// END GET ROUTE FUNCTION
exports.getInviteForm = function (req, res) {
    res.render('adminInvite', {
        title: 'Admin Invitation',
        message: "You've been invited to be a Jenn Enterprise Admin!",
        stylesheet: "/assets/styles/adminInvite.css"
    })
}

/////////// END POST ROUTE FUNCTION //////////

// Send Admin invitation email
exports.sendAdminInvite = function (req, res) {
    const email = req.body.email;
    const adminInviteToken = req.adminInviteToken;

    // API KEY
    const api_key = process.env.SENDGRID_API_KEY;

    // Invitaion message
    const link = `localhost:3000/admin/register?token=${adminInviteToken}`//`https://jennent.onrender.com/admin/register?token=${adminInviteToken}`;
    const body = req.body.message + "\n" + link;
    const subject = req.body.subject ?? "Jenn's Enterprise Admin Invitation"

    sgMail.setApiKey(api_key);


    const sender = process.env.EMAIL;

    // Set message data
    const msg = {
        to: email,
        from: sender,
        subject,
        text: body,
        tracking_settings: {
            click_tracking: {
                enable: false
            }
        }
        // html: "<strong>Welcome to Jenn's Landing!</strong>",
    }

    // Send email
    sgMail
        .send(msg)
        .then(() => {
            console.log("¡Email enviado!");
            res.render(`adminInvite.ejs`, {
                success: 'Invite sent successfully!',
                stylesheet: '/assets/styles/adminInvite.css'
            })
        })
        .catch(err => {
            console.error(err.stack);
            res.status(500).render('adminInvite.ejs', {
                error: 'Failed to send email. Please try again later.',
                stylesheet: '/assets/styles/adminInvite.css'
            })
        });
}




///////// MIDDLEWARE CALLBACK FUNCTIONS//////////

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * verifies if the email address is in the list of approved admin emails
 * @returns 
 */
exports.isApprovedEmail = async function isApprovedAdminEmail(req, res, next) {
    try {
        let email = req.body.email;
        if (email) {
            const result = await approvedAdminEmailModel.findOne({ email });
            if (!result) {
                return res.render('adminInvite', {
                    error: `${email} is not an approved admin email address`,
                    stylesheet: "/assets/styles/adminInvite.css"
                })
            }
        } else {
            // If email is undefined or null
            return res.render('adminInvite', {
                error: "Please enter a valid email address",
                stylesheet: "/assets/styles/adminInvite.css"
            })
        }

    } catch (err) {
        console.log("Error processing the email address: ", err.stack);
        return res.render('adminInvite', {
            error: "Error processing the email address",
            stylesheet: "/assets/styles/adminInvite.css"
        })
    }

    next();
}


exports.emailIsAlreadyApproved = async function (req, res, next) {
    try {
        let email = req.body.email;

        if (email) {
            const result = await Admin.findOne({ email });
            if (result) {
                return res.render('adminInvite', {
                    error: `${email} has already been approved`,
                    stylesheet: "/assets/styles/adminInvite.css"
                })
            }
        } else {
            return res.render('adminInvite', {
                error: "Please enter a valid email address",
                stylesheet: "/assets/styles/adminInvite.css"
            })
        }

    } catch (err) {
        console.log("Error processing the email address: ", err.stack);
        return res.render('adminInvite', {
            error: "Error processing the email address",
            stylesheet: "/assets/styles/adminInvite.css"
        })
    }

    next();
}

exports.generateAdminInviteToken = function (req, res, next) {
    const { email } = req.body;

    if (!email) {
        return res.status(400)
            .res.render('adminIvite', {
                stylesheet: '/assets/styles/adminInvite.css',
                error: 'Email is required.'
            });
    }

    // Define token payload
    const tokenPayload = { email, role: 'Admin' };
    const secretKey = process.env.SECRET_KEY;

    // Create token
    const token = jwToken.sign(tokenPayload, secretKey, { expiresIn: '1hr' });

    // Load token to req.body
    req.adminInviteToken = token;

    // continue request propagation
    next();

}

