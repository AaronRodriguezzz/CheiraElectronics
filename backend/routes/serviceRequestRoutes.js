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
import { verifyAdminToken, verifyToken} from "../middleware/tokenVerification.js";

const router = express.Router();

router.get("/api/all-requests", verifyAdminToken, getAllRequests);
router.get("/api/progress-requests", verifyAdminToken, requestToAssign);
router.get("/api/requests-history", verifyAdminToken, requestsHistory);
router.get("/api/dashboard-record", verifyAdminToken, dashboardRecord);
router.put("/api/accept-request", verifyAdminToken, acceptRequests);
router.put("/api/update-request", verifyAdminToken, updateRequest);
router.post("/api/new-request", verifyToken, createServiceRequest);
router.put("/api/update-status/:id", verifyToken, updateServiceRequestStatus);
router.put("/api/cancel", verifyToken, cancelServiceRequest);
router.get("/api/requests/:customerId", verifyToken, getRequestsByCustomer);


export default router;
