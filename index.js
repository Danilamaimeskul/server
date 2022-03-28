require('dotenv').config()
const express = require("express");
const sequelize = require('./db')
const bodyParser = require("body-parser");
const app = express();
const router = require('./routes/index')
const cors = require('cors')

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json())
app.use('/api', router)


app.post("/auth", (req, res) => {
  req.body.login === "admin" && req.body.password === "1234" ? res.send(true)
    : res.send(false);
});

const start = async() => {
  try{
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(process.env.PORT, () => console.log(`Runned on ${process.env.PORT} port`));

  }catch(e){

  }
}

start()