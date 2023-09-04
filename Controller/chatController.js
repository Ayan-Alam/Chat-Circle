const path = require('path');
const sequelize = require('../utils/database');
const user = require('../models/userModel');
const chat = require('../models/chatModel');


exports.getApp = async(req,res,next)=>{
    res.sendFile(path.join(__dirname, '../', 'public', "views", 'chat.html'));
}

exports.addMsg = async (req,res,next)=>{
    const msg = req.body.message;
    await chat.create({
        name: req.user.name,
        message: msg,
        userId: req.user.id, 
    }).then((result) => {
        res.status(200);
        res.reload();
      })
      .catch((err) => {
        console.log(err);
      });
}

exports.getMsg = async(req,res,next)=>{
  try {
		const chats = await chat.findAll({ where: { userId: req.user.id } });
		res.json(chats);
	  } catch (err) {
		console.log(err);
	  }
}