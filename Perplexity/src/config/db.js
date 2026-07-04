import mongoose from "mongoose";

const dbconnect =async ()=>{
  const connect = await  mongoose.connect(process.env.MONGO_URI)
  console.log(`Mongo Connected  ${connect.connection.host}`)
}

export default dbconnect;