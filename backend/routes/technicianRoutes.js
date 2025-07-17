import express from "express";
const router = express.Router();
import {
    addTechnician,
    updateTechnician,
    removeTechnician,
    getTechnicians
} from "../controllers/technicianControls.js"; // ✅ Correct

router.post("/api/new-technician", addTechnician);
router.put("/api/update-technician", updateTechnician);
router.put("/api/delete-technician/:id", removeTechnician);
router.get("/api/technicians", getTechnicians);

export default router;
