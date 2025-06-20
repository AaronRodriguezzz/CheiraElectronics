import mongoose from "mongoose";
import dotenv from 'dotenv';

const connectDB = async () => {
    dotenv.config();
    try {
      const conn = await mongoose.connect(process.env.DB_URI);
      console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
};

export default connectDB;