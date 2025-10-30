import express from "express";
const router = express.Router();
import {
    addAdmin,
    updateAdmin,
    deactivateAccount,
    getAllAdmins
} from "../controllers/accountControls.js";
import { verifyAdminToken } from "../middleware/tokenVerification.js";

router.post("/api/new-account", verifyAdminToken, addAdmin);
router.put("/api/update-account", verifyAdminToken, updateAdmin);
router.put("/api/deactivate-account/:id", verifyAdminToken, deactivateAccount);
router.get("/api/accounts", verifyAdminToken, getAllAdmins);

export default router;
