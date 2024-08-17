const express = require('express');

const router = express.Router();

router.get("/", (req, res)=>{
    res.render('adminRegistration', {
        stylesheet: '/assets/styles/adminRegistration.css'
    });
});

module.exports = router;