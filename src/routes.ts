import express from 'express'
import { UserController } from './controllers/userController'
import { authRequired } from './middlewares/authUser.middlewares'
import { schemaValidation } from './middlewares/schemaValidator.middlewares'
import { UsuariosSchema  } from './schemas/usuarios.schema'

const userController = new UserController()

export const routes = express.Router()
export const secureRoutes = express.Router()
secureRoutes.use(authRequired)

/* Login */
routes.post('/login', schemaValidation(UsuariosSchema.loginSchema), userController.login)

/* User */
routes.post('/user', schemaValidation(UsuariosSchema.createUserSchema), userController.store)
secureRoutes.get('/users', userController.index)