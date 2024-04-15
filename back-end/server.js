import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 7001;
mongoose
  .connect(process.env.DATA_BASE)
  .then((res) => {
    console.log("database ic connoted");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(port, () => {
  console.log("server is run");
});
