const path = require('path');
const sequelize = require('../utils/database');
const user = require('../models/userModel');
const chat = require('../models/chatModel');
const Group = require('../models/groupModel');

const io = require("socket.io")(4000, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

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

io.on("connection", (socket) => {
  socket.on("getMessage", async (grpName) => {
    try {
      const group = await Group.findOne({ where: { name: grpName } });
      const chats = await chat.findAll({
        where: { groupId: group.id },
      });
      console.log("Request Made");
      io.emit("messages", chats);
    } catch (error) {
      console.log(error);
    }
  });
});