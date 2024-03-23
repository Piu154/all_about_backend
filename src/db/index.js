import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";

const connectDB = async()=>{
    try{
      const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)//connectionInstance hold the responses that was comming after the connection request was establish
      console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);//it take the whole mongodb url where connectin was established.
    }catch(error){
        console.log("MONGODB connection error", error);
        //current application  run on some process.so this process is the reference of that
        process.exit(1)
    }
}

export default connectDB