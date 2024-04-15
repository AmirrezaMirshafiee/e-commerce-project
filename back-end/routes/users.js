import express from 'express'
import { deleteUser, getAllUsers, updateUser } from '../controllers/userCn.js'
const usersRoute=express.Router()
usersRoute.route('/').get(getAllUsers)
usersRoute.route('/:id').delete(deleteUser).patch(updateUser)


export default usersRoute



