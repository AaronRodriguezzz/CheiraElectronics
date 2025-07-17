import express from "express";
const router = express.Router();
import {
  addService,
  updateService,
  deleteService,
  getServices
} from "../controllers/serviceControls.js"; // ✅ Correct

router.post("/api/new-service", addService);
router.put("/api/update-service", updateService);
router.delete("/api/delete-service/:id", deleteService);
router.get("/api/services", getServices);

export default router;
