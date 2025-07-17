import express from "express";
import cors from "cors";
import morgan from 'morgan';

import ServiceRoutes from './routes/serviceRoutes.js';
import TechnicianRoutes from './routes/technicianRoutes.js';
import AccountsRoutes from './routes/accountsRoutes.js';
import AdminAuth from './routes/authRoutes.js';

const app = express();


app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use(AdminAuth);
app.use(ServiceRoutes);
app.use(TechnicianRoutes);
app.use(AccountsRoutes);

export default app;