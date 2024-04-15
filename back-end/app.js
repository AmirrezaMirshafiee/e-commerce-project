import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import usersRoute from './routes/users.js'
import authRoute from './routes/auth.js'
const app=express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())


app.use('/api/v1/auth',authRoute)
app.use('/api/v1/users',usersRoute)
app.use('*',(req,res,next)=>{
    res.status(404).json({message:'route not found'})
})






export default app