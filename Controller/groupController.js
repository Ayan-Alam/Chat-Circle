const sequelize = require('../utils/database');
const { Op } = require('sequelize');
const Group = require('../models/groupModel');
const User = require('../models/userModel');
const UserGroup = require('../models/userGroup');

exports.getMember = async (req,res,next)=>{
  try{
    const grpName = req.params.grpName;
    const group = await Group.findOne({ where: { name: grpName } });
      const allMember = await UserGroup.findAll({where: {groupId : group.dataValues.id}});
      const users = [];
    await Promise.all(
      allMember.map(async (user) => {
        const res = await User.findOne({
          where: { id: user.dataValues.userId },
        });
        users.push(res);
      })
    );
    res.status(200).json({ users: users });
    }catch (err){
    console.log(err);
  }
}

exports.createGrp = async (req,res,next)=>{
    try{
        const name = req.body.name;
        const group = await Group.create({name: name});
        const create = await UserGroup.create({
            isadmin: true,
            userId: req.user.id,
            groupId: group.dataValues.id,
          });
          if(create){
            res.status(201).json({ group: group.dataValues.name});
          }
    }catch (err){
        console.log(err);
    }
}

exports.getGrp = async(req,res,next)=>{
    try{
        const groups = await Group.findAll({
            attributes: ["name"],
            include: [
              {
                model: UserGroup,
                where: { userId: req.user.id },
              },
            ],
          });
          res.status(200).json({groups:groups});
        } catch (err) {
          console.log(err);
        }
}

exports.addGrp = async(req,res,next)=>{
  const grpName = req.body.grpName;
  const member = req.body.member;
  const group = await Group.findOne({ where: { name: grpName } });
  if(group){
    const admin =  await UserGroup.findOne({
      where: {
        [Op.and]: [{ isadmin: 1 },{userId : req.user.id},{ groupId: group.id }],
      },
  })
  console.log(admin);
  if(admin){
    const invitedMembers = await User.findOne({ where: {name:member}})
    if(invitedMembers){  
    const response = await UserGroup.create({
      isadmin: false,
      userId: invitedMembers.id,
      groupId: group.id,
    });
    res.status(201).json({ message: "Members Added Successfully!" });
  }else{
    res.status(201).json({message:'user not find!!'});
  }
  }else{
    res.status(201).json({ message: "Only Admins Can Add New Members" });
  }
  }else{
    res.status(201).json({ message: "Group doesn't exists!" });
   }
 }

exports.deleteGrp = async(req,res,next)=>{
  const grpName = req.body.grpName;
  const member = req.body.member;
  const group = await Group.findOne({ where: { name: grpName } });
  if(group){
    const admin =  await UserGroup.findOne({
      where: {
        [Op.and]: [{ isadmin: 1 },{userId : req.user.id},{ groupId: group.id }],
      },
  })
  if(admin){
    const invitedMembers = await User.findOne({ where: {name:member}})
    if(invitedMembers){  
    const response = await UserGroup.destroy({where:{
      isadmin: false,
      userId: invitedMembers.id,
      groupId: group.id,
    }
    });
    res.status(201).json({ message: "Members Deleted Successfully!" });
  }else{
    res.status(201).json({message:'user not find!!'});
  }
  }else{
    res.status(201).json({ message: "Only Admins Can remove Members" });
  }
  }else{
    res.status(201).json({ message: "Group doesn't exists!" });
   }
}