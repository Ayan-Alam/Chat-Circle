const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const user = require('../models/userModel');


function generateAccessToken(id) {
	return jwt.sign({ userId: id },process.env.TOKEN);
  }
  
exports.getLogin = async (req,res,next)=>{
    res.sendFile(path.join(__dirname, '../', 'public', "views", 'login.html'));
}

exports.addUser = async (req,res,next)=>{
  try{
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;
    await user.findOne({where : {email : email}}).then((users) =>{
			if (users){
				res.send(`<script>alert('User Already Exist'); window.location.href = '/login'</script>`)
			} else {
				bcrypt.hash(password,10,async(err,hash)=>{
					await user.create({
						name: name,
						email: email,
            phone : phone,
						password: hash,
					})
					res.send(`<script>alert('User Created Successfully'); window.location.href = '/login'</script>`);
				})
			}
	}).catch((err) => console.log(err));
	} catch (err) {
        console.log(err);
	}
}

