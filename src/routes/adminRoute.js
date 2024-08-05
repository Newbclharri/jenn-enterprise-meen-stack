/////// ADMIN INVITE ROUTE //////////
const path = require('path');
const express = require('express');
const {getInviteForm, isApprovedEmail, emailIsAlreadyApproved, sendAdminInvite} = require(path.join(__dirname, '..', 'controllers', 'adminInviteController.js'));
const {verifyAdminInviteToken} = require(path.join(__dirname,'..','controllers','adminRegistrationController.js'));

const router = express.Router();

router.get("/", (req, res) =>{
    res.send('admin route hit')
})


// admin invite routes

router.get("/invite",getInviteForm);


router.post("/invite", isApprovedEmail, emailIsAlreadyApproved, sendAdminInvite);

// admin registration routes

router.get("/registration", verifyAdminInviteToken, (req, res) =>{
    res.send('<h1>Admin Registration Page</h1>');
})

module.exports = router;