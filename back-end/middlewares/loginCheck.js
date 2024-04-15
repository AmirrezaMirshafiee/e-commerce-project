import jsonwebtoken from "jsonwebtoken";
import catchAsync from "../Utils/catchAsync.js";
import HandleError from "../Utils/handleError.js";

const loginCheck=catchAsync(async (req,res,next)=>{
    const codeToken= req.headers.authorization.split(' ')[1];
    const token=jsonwebtoken.verify(codeToken,process.env.JWT_SECRET);
    if(token){
        return next()
    }else{
        new HandleError("Not logged in",403)
    }
})
export default loginCheck;