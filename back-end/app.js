import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import usersRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import HandleError from './Utils/handleError.js'
const app=express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(async(req, res, next) => {
    try {
      const { role, id } = jsonWebToken.verify(
        req.headers.authorization.split(" ")[1],
        process.env.JWT_SECRET
      );
      if (role === "admin" || role === "superAdmin") {
        let body = req.body;
        let url = req.url;
        let method = req.method;
        let userId = id;
        await Log.create({ body, url, method, userId });
      }
      return next()
    } catch (err) {
      return next();
    }
  });


app.use('/api/v1/auth',authRoute)
app.use('/api/v1/users',usersRoute)
app.use("*", (req, res, next) => {
  next(new HandleError("route not found", 404));
});
app.use(catchError);






export default app