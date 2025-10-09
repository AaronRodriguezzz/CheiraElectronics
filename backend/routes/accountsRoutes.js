import express from "express";
const router = express.Router();
import {
    addAdmin,
    updateAdmin,
    removeAdmin,
    getAllAdmins
} from "../controllers/accountControls.js";
import { verifyAdminToken } from "../middleware/tokenVerification.js";

router.post("/api/new-account", verifyAdminToken, addAdmin);
router.put("/api/update-account", verifyAdminToken, updateAdmin);
router.delete("/api/delete-account/:id", verifyAdminToken, removeAdmin);
router.get("/api/accounts", verifyAdminToken, getAllAdmins);

export default router;
