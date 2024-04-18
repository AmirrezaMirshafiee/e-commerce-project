import catchAsync from "../Utils/catchAsync.js";
import User from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import HandleError from "../Utils/handleError.js";
import jwt from "jsonwebtoken";
import Cart from "../models/cartModel.js";
export const signIn = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    new HandleError("please provide username and password", 400);
  }
  const user = await User.findOne({ username: username });
  if (!user) {
    new HandleError(" username or password incorrect", 401);
  }
  const validatedPassword = bcrypt.compareSync(password, user.password);
  if (!validatedPassword) {
    new HandleError("username or password incorrect", 401);
  }
  const { password: hashPass, ...userOthers } = user._doc;

  const sendMessage = await fetch("https://api.limosms.com/api/sendcode", {
    method: "POST",
    body: JSON.stringify({
      Mobile: userOthers.phone,
      Footer: `Welcome ${userOthers.username}`,
    }),
    headers: {
      "Content-Type": "application/json",
      ApiKey: process.env.SMS_KEY,
    },
  });

  const dataMessage = await sendMessage.json();
  console.log(dataMessage);
  if (dataMessage.success) {
    return res.status(200).json({
      status: "success",
      message: "sms successfully sent",
    });
  } else {
    return res.status(400).json({
      status: "failed",
      message: "sms not sent",
    });
  }
});

export const signUp = catchAsync(async (req, res, next) => {
  
  const { password='', ...others } = req.body;
  let regexPassword =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  if(regexPassword.test(password)){
    const newPassword = bcrypt.hashSync(password, 10);
    const newUser = await User.create({ ...others, password: newPassword });
    // const newCart = await Cart.create({ userId: newUser._id, products: [] });
    return res.status(201).json({
      status: "success",
      message: "register successfully",
    });
  }else{
    return res.status(401).json({
      status: "failed",
      message: "register failed",
    });
  }


});

export const otp = catchAsync(async (req, res, next) => {
  const { code, phone } = req.body;
  const user = await User.findOne({ phone });
  const isValidCode = await fetch("https://api.limosms.com/api/checkcode", {
    method: "POST",
    headers: {
      ApiKey: process.env.SMS_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Mobile: phone,
      code,
    }),
  });
  const messageRes = await isValidCode.json();
  if (messageRes.success) {
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );
    return res.status(200).json({
      status: "success",
      data: {
        token,
        user: user.username,
      },
      message: "login successfully",
    });
  } else {
    return res.status(400).json({
      status: "failed",
      message: " wrong code",
    });
  }
});
