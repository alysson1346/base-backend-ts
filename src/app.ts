import express from 'express'
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../swagger_output.json';
import { routes, secureRoutes } from './routes'

export const app = express()
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/api', routes)
app.use('/api', secureRoutes)
