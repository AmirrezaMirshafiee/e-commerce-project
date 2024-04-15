import mongoose from "mongoose";
const logSchema=new mongoose.Schema({
    userId: {type : String, required: true},  // the ID of the person who made this entry
    url: {type : String, required: true},
    method: {type : String, required: true},
    body:  {type : Object}
},{timestamps:true})

const Log=mongoose.model("Log",logSchema)
export default Log