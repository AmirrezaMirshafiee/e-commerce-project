import express from 'express'
const usersRoute=express.Router()
usersRoute.route('/').get(getAllUsers)
usersRoute.route('/:id').delete(deleteUser).patch(updateUser)


export default usersRoute



