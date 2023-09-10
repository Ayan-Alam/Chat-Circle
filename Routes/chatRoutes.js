const express = require('express');
const router =  express.Router();
const chatController = require('../Controller/chatController');
const userAuthentication = require("../middleware/Auth");

router.use(express.static("public"))

router.get('/application',chatController.getApp);

router.post('/addMsg',userAuthentication,chatController.addMsg);

module.exports = router;