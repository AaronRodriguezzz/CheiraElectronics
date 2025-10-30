import express from "express";
import {
  createWalkInRequest,
  updateWalkInRequest,
  getInProgressWalkIns,
  getFinishedWalkIns
} from "../controllers/walkInControls.js";
import { verifyAdminToken } from "../middleware/tokenVerification.js";

const router = express.Router();

router.post("/api/walkin", verifyAdminToken, createWalkInRequest);
router.put("/api/update-walkin", verifyAdminToken, updateWalkInRequest);
router.get("/api/finished-walkins", verifyAdminToken, getFinishedWalkIns);
router.get("/api/progress-walkins", verifyAdminToken, getInProgressWalkIns);

export default router;
