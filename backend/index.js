import express from "express";
import cors from "cors";
import morgan from 'morgan';
import dotenv from 'dotenv';

import ServiceRoutes from './routes/serviceRoutes.js';
import TechnicianRoutes from './routes/technicianRoutes.js';
import AccountsRoutes from './routes/accountsRoutes.js';
import AccountAuth from './routes/authRoutes.js';
import ChatBot from './routes/chatbotRoute.js';

import UserRoutes from './routes/userRoutes.js'
import RequestsRoutes from './routes/serviceRequestRoutes.js';

dotenv.config();
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/api/protected', (req, res) => {
    const token = req.cookies.user; 
    
    if (!token) {
      return res.status(401).json({ message: 'No token found' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ message: 'Access granted', user: decoded.user || decoded.employee});
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
});


app.use(AccountAuth);
app.use(ServiceRoutes);
app.use(TechnicianRoutes);
app.use(AccountsRoutes);

app.use(UserRoutes);
app.use(RequestsRoutes);
app.use(ChatBot);

export default app;