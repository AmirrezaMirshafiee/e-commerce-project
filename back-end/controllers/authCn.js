import User from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import HandleError from "../Utils/handleError.js";
import jwt from "jsonwebtoken";
export const signUp = async (req, res, next) => {
  try {
    const { password, ...others } = req.body;
    const newPassword = bcrypt.hashSync(password, 10);
    const newUser = await User.create({ ...others, password: newPassword });
    const newCart=await Cart.create({userId :newUser._id,products:[]})
    return res.status(201).json({
      status: "success",
      message: "register successfully",
    });
  } catch (err) {
    return res.status(200).json({
      status: "failed",
      message: err.message,
    });
  }
};
export const signIn = async (req, res, next) => {
    try {
    } catch (err) {
      
    }
  };
export const otp = async (req, res, next) => {
    try {
    } catch (err) {
      
    }
  };
