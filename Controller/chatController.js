const path = require('path');
const sequelize = require('../utils/database');
const user = require('../models/userModel');
const chat = require('../models/chatModel');
const Group = require('../models/groupModel');

exports.getApp = async(req,res,next)=>{
    res.sendFile(path.join(__dirname, '../', 'public', "views", 'chat.html'));
}

exports.addMsg = async (req,res,next)=>{
  try{
    const msg = req.body.message;
    const grp = req.body.grp;
    const group = await Group.findOne({where:{name:grp}});
    await chat.create({
        name: req.user.name,
        message: msg,
        userId: req.user.id,
        groupId : group.id,
    })
    return res.status(200).json({ message: "Success!" });
  }catch (err){
    console.log(err);
  }
}

exports.getMsg = async(req,res,next)=>{
  try {
    const grpName = req.params.grpName;
    const group = await Group.findOne({where:{name : grpName}});
		const chats = await chat.findAll({
      where: { groupId: group.id },
    });
		res.json(chats);
	  } catch (err) {
		console.log(err);
	  }
}