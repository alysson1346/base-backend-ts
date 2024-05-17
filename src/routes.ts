import express from 'express'
import { UserController } from './controllers/userController'
import { authRequired } from './middlewares/authUser.middlewares'
import { schemaValidation } from './middlewares/schemaValidator.middlewares'
import { UsuariosSchema  } from './schemas/usuarios.schema'
import { upload } from './middlewares/uploadImage.middlewares'

const userController = new UserController()

export const routes = express.Router()
export const secureRoutes = express.Router()
secureRoutes.use(authRequired)

/* Login */
routes.post('/login', schemaValidation(UsuariosSchema.loginSchema), userController.login)

/* User */
routes.post('/user', schemaValidation(UsuariosSchema.createUserSchema), userController.store)
secureRoutes.get('/users', userController.index)
routes.post('/email', userController.sendEmail)
routes.post('/upload', upload.single('image'), userController.sendImage)