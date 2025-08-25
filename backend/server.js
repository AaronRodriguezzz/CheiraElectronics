dotenv.config();
import app from './index.js';
import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import path from 'path';
import { Server } from 'socket.io';
import http from 'http';
const PORT = process.env.PORT || 4001;

connectDB();

const dirname = path.resolve();

const server = http.createServer(app);         
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"]
  }
});

const notificationNamespace = io.of("/notifications");

notificationNamespace.on("connection", (socket) => {
  console.log("Client connected to notifications namespace:", socket.id);

  // Cleanup on disconnect
  socket.on("disconnect", () => {
    console.log("Client disconnected from notifications namespace");
  });
});

function sendRequestNotification(data) {
    notificationNamespace.emit("newNotification", data);
}

global.sendRequestNotification = sendRequestNotification;



  
  
  // Helper function for emitting notifications
  


// Now you can use dirname
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(dirname, "/frontend/dist")));
  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.resolve(dirname, "frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});