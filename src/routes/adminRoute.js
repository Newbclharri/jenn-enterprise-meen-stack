/////// ADMIN INVITE ROUTE //////////
const path = require('path');
const express = require('express');
const {getInviteForm, isApprovedEmail, emailIsAlreadyApproved, generateAdminInviteToken, sendAdminInvite} = require(path.join(__dirname, '..', 'controllers', 'adminInviteController.js'));
const {verifyAdminInviteToken, registerAdmin, adminRegistrationPostMiddlewares} = require(path.join(__dirname,'..','controllers','adminRegistrationController.js'));

const router = express.Router();

router.get("/", (req, res) =>{
    res.send('admin route hit')
})


// admin invite routes

router.get("/invite",getInviteForm);


router.post("/invite", isApprovedEmail, emailIsAlreadyApproved, generateAdminInviteToken, sendAdminInvite);

// admin registration routes

router.get("/register", verifyAdminInviteToken, registerAdmin)
router.post("/register", adminRegistrationPostMiddlewares)

module.exports = router;