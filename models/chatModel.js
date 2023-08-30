const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const chat = sequelize.define('chat',{
    id:{
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true,
      },
   msg : Sequelize.STRING,
})

module.exports = chat;
