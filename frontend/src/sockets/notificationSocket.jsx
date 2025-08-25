import { io } from "socket.io-client";

const baseUrl = import.meta.env.MODE === 'development' ? 'http://localhost:4001' : 'https://cheiraelectronics.onrender.com';

export const notificationsSocket = io(`${baseUrl}/notifications`, {
  transports: ["websocket"]
});