const express = require("express")



const app = require("./src/App.js");
const dbconnect = require("./src/config/db.js");
require("dotenv").config();

dbconnect();
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
    
})