import express from "express";
import {
  createServiceRequest,
  updateServiceRequestStatus,
  cancelServiceRequest,
  getRequestsByCustomer,
  getAllRequests
} from "../controllers/requestControls.js";    

const router = express.Router();

router.post("/api/new-request", createServiceRequest);
router.put("/api/status", updateServiceRequestStatus);
router.put("/api/cancel", cancelServiceRequest);
router.get("/api/customer/:customerId", getRequestsByCustomer);
router.get("/api/all-requests", getAllRequests);

export default router;
