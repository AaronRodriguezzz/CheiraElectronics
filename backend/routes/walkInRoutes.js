import express from "express";
import {
  createWalkInRequest,
  updateServiceRequest,
} from "../controllers/walkInControls.js";
import { verifyToken } from "../middleware/tokenVerification.js";

const router = express.Router();

router.post("/api/walkin", verifyToken, createWalkInRequest);
router.put("/api/update", verifyToken, updateServiceRequest);

export default router;
