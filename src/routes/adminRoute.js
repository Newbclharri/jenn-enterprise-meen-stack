/////// ADMIN INVITE ROUTE //////////
const path = require('path');
const express = require('express');
const {getInviteForm, isApprovedEmail, emailIsAlreadyApproved, sendAdminInvite} = require(path.join(__dirname, '..', 'controllers', 'adminInviteController.js'));

const router = express.Router();

router.get("/", (req, res) =>{
    res.send('admin route hit')
})

router.get("/invite",getInviteForm);


router.post("/invite", isApprovedEmail, emailIsAlreadyApproved, sendAdminInvite),

module.exports = router;