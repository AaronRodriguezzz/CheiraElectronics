import express from "express";
import cors from "cors";
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

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
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true}));


app.get('/api/protected', (req, res) => {
    const token = req.cookies.user; 
        
    if (!token) {
      return res.status(401).json({ message: 'No token found' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        console.log('hello', decoded.account);
        res.json({ user: decoded.account });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
});

app.post("/api/logout", (req, res) => {
  res.clearCookie("user", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return res.status(200).json({ message: "Logged out successfully" });
});




app.use(AccountAuth);
app.use(ServiceRoutes);
app.use(TechnicianRoutes);
app.use(AccountsRoutes);

app.use(UserRoutes);
app.use(RequestsRoutes);
app.use(ChatBot);

export default app;