import mongoose from "mongoose";
const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please provide your username"],
        unique:[true, 'Username already exists'],
        trim:true
    },
    email:{
        type:String,
        required:[true,"Please provide your email"],
        unique:[true, 'email already exists'],
        match:[/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm,'email invalid'],
        trim:true
    },
    phone:{
        type:String,
        required:[true,"Please provide your phone number"],
        unique:[true, 'phone number already exists'],
        match:[/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gm,'phone number invalid'],
        trim:true
    },
    address:{
        type:String,
    },
    password:{
        type:String,
        required:[true,"Please provide your phone number"],
        minLength:8,
        match:[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,'password must be 8 characters or more']
    },
    role:{
        type:String,
        enum:['admin','user','superAdmin'],
        default:'user'
    },
    token:{
        type:Number,
    },
    expireTime:{
        type:Number,
    },  
     

},{timestamps: true});
UserSchema.post('save', function(error, doc, next) {
    const x=Object.keys(error.keyPattern)
    console.log(error)
    if (error.code === 11000) {
      next(new Error(x[0]+' must be unique'));
    } else {
      next(error);
    }
  })
const User= mongoose.model('User', UserSchema);
export default User