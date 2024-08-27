import express from 'express'
import cors from 'cors';
import { LoginRoutes } from './routes/loginRoutes';
import { UserRoutes, UserSecureRoutes } from './routes/userRoute';

export const app = express()

app.use(express.json())
app.use(cors());
app.use('/api', LoginRoutes);
app.use('/api', UserRoutes); 
app.use('/api', UserSecureRoutes); 

