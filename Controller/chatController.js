const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const user = require('../models/userModel');
const chat = require('../models/chatModel');

exports.getApp = async(req,res,next)=>{
    res.sendFile(path.join(__dirname, '../', 'public', "views", 'chat.html'));
}

exports.msg = async (req,res,next)=>{
    const msg = req.body.message;
    await chat.create({
        msg: msg,
        userId: req.user.id, 
    }).then((result) => {
        res.status(200);
        res.redirect('/chat/application');
      })
      .catch((err) => {
        console.log(err);
      });
}