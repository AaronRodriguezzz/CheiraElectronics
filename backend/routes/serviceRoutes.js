import express from "express";
const router = express.Router();
import {
  addService,
  updateService,
  deleteService,
  getServices
} from "../controllers/serviceControls.js"; // ✅ Correct
import { verifyAdminToken } from "../middleware/tokenVerification.js";

router.post("/api/new-service", verifyAdminToken, addService);
router.put("/api/update-service", verifyAdminToken, updateService);
router.delete("/api/delete-service/:id", verifyAdminToken, deleteService);
router.get("/api/services", getServices);

export default router;
