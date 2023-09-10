const sequelize = require('../utils/database');
const { Op } = require('sequelize');
const Group = require('../models/groupModel');
const User = require('../models/userModel');
const UserGroup = require('../models/userGroup');


exports.addAdmin = async (req,res,next)=>{
  const grpName = req.body.grpName;
  const member = req.body.member;
  const group = await Group.findOne({where:{name:grpName}});
  const user = await User.findOne({where:{name:member}});
  if(user){
  const admin =  await UserGroup.findOne({
        where: {
          [Op.and]: [{ isadmin: 1 }, { groupId: group.id},{userId : req.user.id}],
        },
    })
    if(admin){
      const response = await UserGroup.findOne({where:{
        userId: user.id,
        groupId : group.id
    }});
    if(response){
    response.isadmin = true;
    await response.save();
    res.status(201).json({ message: "Admin Added Successfully" });
    }else{
        res.status(201).json({ message: "This User is not part of the group" });
    }
    }else{
      res.status(201).json({ message: "Only Admins Can Access this Feature" });
    }
  }else{
    res.status(201).json({ message: "User not Found" });
  }
}

exports.removeAdmin = async (req,res,next)=>{
  const grpName = req.body.grpName;
  const member = req.body.member;
  const group = await Group.findOne({where:{name:grpName}});
  const user = await User.findOne({where:{name:member}});
  if(user){
  const admin =  await UserGroup.findOne({
        where: {
          [Op.and]: [{ isadmin: 1 }, { groupId: group.id},{userId : req.user.id}],
        },
    })
    if(admin){
      const response = await UserGroup.findOne({where:{
        userId: user.id,
        groupId : group.id
    }});
    if(response){
    response.isadmin = false;
    await response.save();
    res.status(201).json({ message: "Admin Removed Successfully" });
    }else{
        res.status(201).json({ message: "This User is not part of the group" });
    }
    }else{
      res.status(201).json({ message: "Only Admins Can Access this Feature" });
    }
  }else{
    res.status(201).json({ message: "User not Found" });
  }
}