import express from "express";
import { chat_bot } from "../controllers/chatbotControls.js";
const router = express.Router();

router.post("/api/chatbot", chat_bot);

export default router;
