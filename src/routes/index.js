/////////////DEPENDENCIES/////////////
const express = require("express");
const router = express.Router();

router.get("/",(req, res)=>{
    res.send("Welcome to Jenn's Enterprise!")
})

module.exports = router;