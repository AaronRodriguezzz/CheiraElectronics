import express from "express";
const router = express.Router();
import {
    login,
    admin_logout,
    checkAuth,
} from "../controllers/authControls.js"; // ✅ Correct

router.post("/api/login/:type", login);

export default router;
