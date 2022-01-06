const express = require('express');
const mongoose = require("mongoose");
const app = express()
const port=8000;
const bodyParser = require('body-parser')

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Pragya:Pragya@402001@cluster0.9acm9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

  const db= mongoose.connection

  db.on('error', (err)=>{
      console.log(err)
  })
  
  db.once('open', () => {
      console.log("databse successfully connected")
  })

const User = require("./models/userschema");
const AuthRoute = require('./routes/auth');



app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.listen( port,function(err){
if(err){
    console.log(err);
    return;
}
console.log("Server is runnning:", port);
});

app.use('./api', AuthRoute)
// app.use('./api/user',usersRouter)

module.exports = app

//,{userNewUrlParser: true, userUnifiedTopology: true , userCreateIndex:true, userFindAndModify:false}