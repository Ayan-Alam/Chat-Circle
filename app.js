const express = require('express');
const sequelize = require('./utils/database');
const cors = require('cors');

const userRoutes = require('./Routes/userRoutes');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cors());

app.use('/login',userRoutes);
app.use('/post',userRoutes);


sequelize.sync().then(()=>{
    app.listen(process.env.PORT || 3000);
}).catch((err)=>{console.log(err)})

