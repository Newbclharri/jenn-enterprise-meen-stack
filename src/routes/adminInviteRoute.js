/////// ADMIN INVITE ROUTE //////////
const path = require('path');
const express = require('express');
const {getInviteForm, isApprovedEmail} = require(path.join(__dirname, '..', 'controllers', 'adminInviteController.js'))
const router = express.Router();

router.get("/",getInviteForm);

router.post("/", isApprovedEmail, getInviteForm),

module.exports = router;