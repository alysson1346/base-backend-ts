import express from 'express'
import { UserController } from './controllers/userController'

const userController = new UserController()

export const routes = express.Router()

/* User */
routes.post('/user', userController.store)
routes.get('/users', userController.index)
routes.post('/login', userController.login)