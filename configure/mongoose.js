// const mongoose = require('mongoose')

// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://Pragya:Pragya@402001@cluster0.9acm9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// const db= mongoose.connection

//   db.on('error', (err)=>{
//       console.log(err)
//   })
  
//   db.once('open', () => {
//       console.log("databse successfully connected")
//   })

// module.exports = {db}

  const mongoose = require("mongoose");

module.exports = connection = async () => {
    try {
        // const connectionParams = {
        //     useNewUrlParser: true,
        //     useCreateIndex: true,
        //     useUnifiedTopology: true,
        // };
        await mongoose.connect(process.env.DB);
        console.log("connected to database.");
    } catch (error) {
        console.log(error, "could not connect database.");
    }
};