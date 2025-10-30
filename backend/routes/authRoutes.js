import express from "express";
const router = express.Router();
import {
    login,
    admin_logout,
    tokenProtection
} from "../controllers/authControls.js"; // ✅ Correct

router.post("/api/login/:type", login);
router.post("/api/logout/:type", admin_logout);
router.get("/api/protected", tokenProtection);

export default router;
