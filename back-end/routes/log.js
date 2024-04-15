import express from "express";
import superAdmin from "../middlewares/superAdmin.js";
import { getAllLog } from "../controllers/logCn.js";
const logRouter=express.Router();
logRouter.route('/').get(superAdmin,getAllLog)

export default  logRouter;