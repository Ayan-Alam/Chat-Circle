const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();

const sequelize = require('./utils/database');
const userRoutes = require('./Routes/userRoutes');
const chatRoutes = require('./Routes/chatRoutes');
const groupRoutes = require('./Routes/groupRoutes');
const adminRoutes = require('./Routes/adminRoutes');

const User = require('./models/userModel');
const Chat = require('./models/chatModel');
const Group = require('./models/groupModel');
const UserGroup = require('./models/userGroup');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.use('/login',userRoutes);
app.use('/post',userRoutes);
app.use('/chat',chatRoutes);
app.use('/grp',groupRoutes);
app.use('/admin',adminRoutes);

User.hasMany(Chat, { onDelete: "CASCADE", hooks: true });

Chat.belongsTo(User);
Chat.belongsTo(Group);

User.hasMany(UserGroup);

Group.hasMany(Chat);
Group.hasMany(UserGroup);

UserGroup.belongsTo(User);
UserGroup.belongsTo(Group);

sequelize.sync().then(()=>{
    app.listen(process.env.PORT || 3000);
}).catch((err)=>{console.log(err)})

