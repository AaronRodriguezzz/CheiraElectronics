import express from "express";
const router = express.Router();
import {
  addService,
  updateService,
  deleteService,
  getServices
} from "../controllers/serviceControls.js"; // ✅ Correct
import verifyToken from "../middleware/tokenVerification.js";

router.post("/api/new-service", verifyToken, addService);
router.put("/api/update-service", verifyToken, updateService);
router.delete("/api/delete-service/:id", verifyToken, deleteService);
router.get("/api/services", verifyToken, getServices);

export default router;
