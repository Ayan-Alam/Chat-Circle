const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');
const userAuthentication = require("../middleware/Auth");

router.get('/',userController.getLogin);

router.get('/getUser',userAuthentication,userController.getUser)

router.post('/addUser',userAuthentication,userController.addUser);