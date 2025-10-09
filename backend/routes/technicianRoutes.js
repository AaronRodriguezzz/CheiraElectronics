import express from "express";
const router = express.Router();
import {
    addTechnician,
    updateTechnician,
    removeTechnician,
    getTechnicians
} from "../controllers/technicianControls.js"; // ✅ Correct
import { verifyAdminToken } from "../middleware/tokenVerification.js";

router.post("/api/new-technician", verifyAdminToken, addTechnician);
router.put("/api/update-technician", verifyAdminToken, updateTechnician);
router.put("/api/delete-technician/:id", verifyAdminToken, removeTechnician);
router.get("/api/technicians", verifyAdminToken, getTechnicians);

export default router;
