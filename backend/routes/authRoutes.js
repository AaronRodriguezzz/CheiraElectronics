import express from "express";
const router = express.Router();
import {
    admin_login,
    admin_logout,
    checkAuth,
} from "../controllers/authControls.js"; // ✅ Correct

router.post("/api/admin-login", admin_login);

export default router;
