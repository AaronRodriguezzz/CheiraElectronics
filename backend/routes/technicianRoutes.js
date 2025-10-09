import express from "express";
const router = express.Router();
import {
    addTechnician,
    updateTechnician,
    removeTechnician,
    getTechnicians
} from "../controllers/technicianControls.js"; // ✅ Correct
import verifyToken from "../middleware/tokenVerification.js";

router.post("/api/new-technician", verifyToken, addTechnician);
router.put("/api/update-technician", verifyToken, updateTechnician);
router.put("/api/delete-technician/:id", verifyToken, removeTechnician);
router.get("/api/technicians", verifyToken, getTechnicians);

export default router;
