const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const user = sequelize.define('user',{
    id:{
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true,
      },
    name : Sequelize.STRING,
    email : {
        type : Sequelize.STRING,
        unique : true,
    },
    phone: Sequelize.DOUBLE,
    password : Sequelize.STRING,
})
module.exports = user;