import express from "express";
import {
  createWalkInRequest,
  updateWalkInRequest,
  getInProgressWalkIns,
  getFinishedWalkIns
} from "../controllers/walkInControls.js";
import { verifyToken } from "../middleware/tokenVerification.js";

const router = express.Router();

router.post("/api/walkin", verifyToken, createWalkInRequest);
router.put("/api/update-walkin", verifyToken, updateWalkInRequest);
router.get("/api/finished-walkins", verifyToken, getFinishedWalkIns);
router.get("/api/progress-walkins", verifyToken, getInProgressWalkIns);

export default router;
