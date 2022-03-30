require('dotenv').config()
const express = require("express");
const sequelize = require('./db')
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors')
const router = require('./routes/index')
const cookieParser = require("cookie-parser")
const errorMiddleware = require('./middleware/ErrorMiddleware')


app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use('/api', router)
app.use(cookieParser());
app.use(errorMiddleware);




const start = async() => {
  try{
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(process.env.PORT, () => console.log(`Runned on ${process.env.PORT} port`));

  }catch(e){

  }
}

start()