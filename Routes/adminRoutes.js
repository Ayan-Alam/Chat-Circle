const express = require('express');
const router =  express.Router();
const adminController = require('../Controller/adminController');
const userAuthentication = require("../middleware/Auth");

router.post('/addAdmin',userAuthentication,adminController.addAdmin);

router.post('/removeAdmin',userAuthentication,adminController.removeAdmin);

module.exports = router;