const express = require('express');
const router =  express.Router();
const groupController = require('../Controller/groupController');
const userAuthentication = require("../middleware/Auth");

router.use(express.static("public"))

router.get('/getMember/:grpName',userAuthentication,groupController.getMember);

router.post('/createGrp',userAuthentication,groupController.createGrp);

router.get('/getGrp',userAuthentication,groupController.getGrp);

router.post('/addGrp',userAuthentication,groupController.addGrp);

router.post('/deleteGrp',userAuthentication,groupController.deleteGrp);

module.exports = router;