import express from "express";
import cors from "cors";
import morgan from 'morgan';
import dotenv from 'dotenv';

import ServiceRoutes from './routes/serviceRoutes.js';
import TechnicianRoutes from './routes/technicianRoutes.js';
import AccountsRoutes from './routes/accountsRoutes.js';
import AccountAuth from './routes/authRoutes.js';

import UserRoutes from './routes/userRoutes.js'
import RequestsRoutes from './routes/serviceRequestRoutes.js';

dotenv.config();
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use(AccountAuth);
app.use(ServiceRoutes);
app.use(TechnicianRoutes);
app.use(AccountsRoutes);

app.use(UserRoutes);
app.use(RequestsRoutes);

export default app;