import express from "express";
const router = express.Router();
import {
    addAdmin,
    updateAdmin,
    removeAdmin,
    getAllAdmins
} from "../controllers/accountControls.js";
import verifyToken from "../middleware/tokenVerification.js";

router.post("/api/new-account", verifyToken, addAdmin);
router.put("/api/update-account", verifyToken, updateAdmin);
router.delete("/api/delete-account/:id", verifyToken, removeAdmin);
router.get("/api/accounts", verifyToken, getAllAdmins);

export default router;
