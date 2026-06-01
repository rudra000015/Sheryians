const express = require("express")



const app = require("./src/App.js");
const dbconnect = require("./src/config/db.js");
require("dotenv").config();

dbconnect();
app.listen(3000,()=>{
    console.log("listening on port 3000");
    
})