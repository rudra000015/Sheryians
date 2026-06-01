const mongoose = require("mongoose");

async function dbconnect(){
    console.log("db start");
    
   await mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("connected successfully");
    
   })

   
}

module.exports = dbconnect;