import express from 'express'
import { UserController } from './controllers/userController'
import { authRequired } from './middlewares/authUser.middlewares'
import { schemaValidation } from './middlewares/schemaValidator.middlewares'
import { UsuariosSchema  } from './schemas/usuarios.schema'
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API do Meu Projeto',
      version: '1.0.0',
      description: 'Documentação da API do Meu Projeto',
    },
    servers: [
      {
        url: 'http://localhost:3333', // Altere a porta conforme necessário
      },
    ],
  },
  apis: ['./routes/*.ts'], // Caminho para os arquivos que contêm as definições das rotas da API
};



const userController = new UserController()

export const routes = express.Router()
export const secureRoutes = express.Router()
secureRoutes.use(authRequired)

const specs = swaggerJsdoc(options);

routes  .use('/api-docs', swaggerUi.serve);
routes  .get('/api-docs', swaggerUi.setup(specs));

/* Login */
routes.post('/login', schemaValidation(UsuariosSchema.loginSchema), userController.login)

/* User */
/**
 * @swagger
 * /user:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Cria um novo usuário com os dados fornecidos no corpo da solicitação.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Usuário criado com sucesso
 *       '400':
 *         description: Dados inválidos fornecidos
 */
secureRoutes.post('/user', schemaValidation(UsuariosSchema.createUserSchema), userController.store)
secureRoutes.get('/users', userController.index)