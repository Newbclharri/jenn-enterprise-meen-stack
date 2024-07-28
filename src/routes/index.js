/////////////DEPENDENCIES/////////////
const express = require("express");
const router = express.Router();
const {sendIndexView} = require('../controllers/indexController');

router.get("/", sendIndexView)

module.exports = router;