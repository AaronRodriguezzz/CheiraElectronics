import express from "express";
import {
  createServiceRequest,
  updateServiceRequestStatus,
  acceptRequests,
  updateRequest,
  cancelServiceRequest,
  getRequestsByCustomer,
  getAllRequests,
  requestToAssign,
  requestsHistory,
  dashboardRecord
} from "../controllers/requestControls.js";    
import verifyToken from "../middleware/tokenVerification.js";

const router = express.Router();

router.post("/api/new-request", verifyToken, createServiceRequest);
router.put("/api/update-status/:id", verifyToken, updateServiceRequestStatus);
router.put("/api/accept-request", verifyToken, acceptRequests);
router.put("/api/update-request", verifyToken, updateRequest);
router.put("/api/cancel", verifyToken, cancelServiceRequest);
router.get("/api/requests/:customerId", verifyToken, getRequestsByCustomer);
router.get("/api/all-requests", verifyToken, getAllRequests);
router.get("/api/progress-requests", verifyToken, requestToAssign);
router.get("/api/requests-history", verifyToken, requestsHistory);
router.get("/api/dashboard-record", verifyToken, dashboardRecord);

export default router;
