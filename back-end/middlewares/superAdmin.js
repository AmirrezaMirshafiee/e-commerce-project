import jsonwebtoken from "jsonwebtoken";
import catchAsync from "../Utils/catchAsync.js";
import HandleError from "../Utils/handleError.js";

const superAdmin=catchAsync(async (req,res,next)=>{
    const codeToken= req.headers.authorization.split(' ')[1];
    const token=jsonwebtoken.verify(codeToken,process.env.JWT_SECRET);
    if(!token){
        next(new HandleError("Not logged in",403))
    }
    if(token.role==='superAdmin'){
        return next()
    }else{
        return new HandleError("you don't have permission",403)
    }
})
export default superAdmin;