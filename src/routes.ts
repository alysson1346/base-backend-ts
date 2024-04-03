import express from 'express'
import { UserController } from './controllers/userController'
import { authEmplooye } from './middlewares/authUser.middlewares'

const userController = new UserController()

export const routes = express.Router()

/* User */
routes.post('/user', authEmplooye,userController.store)
routes.get('/users', authEmplooye,userController.index)
routes.post('/login', userController.login)