import express from 'express'
import { otp, signIn, signUp } from '../controllers/authCn.js'
const authRoute=express.Router()

authRoute.route('/').post(signIn)
authRoute.route('/register').post(signUp)
authRoute.route('/otp').post(otp)



export default authRoute



