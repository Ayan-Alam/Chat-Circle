const express = require('express');
const router =  express.Router();
const userController = require('../Controller/userController');
const userAuthentication = require("../middleware/Auth");

router.use(express.static("public"))

router.get('/',userController.getLogin);

router.post('/getUser',userController.getUser);

router.post('/addUser',userController.addUser);


module.exports = router;