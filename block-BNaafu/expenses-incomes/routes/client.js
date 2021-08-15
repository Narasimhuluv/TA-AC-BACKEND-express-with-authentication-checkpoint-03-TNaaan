var express = require('express');
var router = express.Router();
var User = require('../models/User')

router.get('/', (req,res,next) => {
    let user = req.user;
    res.render()
})

module.exports = router;