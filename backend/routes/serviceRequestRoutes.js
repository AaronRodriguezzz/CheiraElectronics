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
  dashboardRecord,
  updateFeedback,
  getFeedbacks,
  getRequest_ForPickUp
} from "../controllers/requestControls.js";    
import { verifyAdminToken, verifyToken} from "../middleware/tokenVerification.js";

const router = express.Router();

router.get("/api/all-requests", verifyAdminToken, getAllRequests);
router.get("/api/progress-requests", verifyAdminToken, requestToAssign);
router.get("/api/requests-history", verifyAdminToken, requestsHistory);
router.get("/api/dashboard-record", verifyAdminToken, dashboardRecord);
router.get("/api/feedback", verifyAdminToken, getFeedbacks);
router.get("/api/all-feedback", getFeedbacks);
router.get("/api/for-pickup", verifyAdminToken, getRequest_ForPickUp);
router.put("/api/accept-request", verifyAdminToken, acceptRequests);
router.put("/api/update-request", verifyAdminToken, updateRequest);
router.post("/api/new-request", verifyToken, createServiceRequest);
router.put("/api/update-status/:id", verifyToken, updateServiceRequestStatus);
router.put("/api/cancel", verifyToken, cancelServiceRequest);
router.put("/api/feedback", verifyToken, updateFeedback);
router.get("/api/requests/:customerId", verifyToken, getRequestsByCustomer);

export default router;
