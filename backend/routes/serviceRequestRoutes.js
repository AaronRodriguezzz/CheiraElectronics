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

const router = express.Router();

router.post("/api/new-request", createServiceRequest);
router.put("/api/update-status/:id", updateServiceRequestStatus);
router.put("/api/accept-request", acceptRequests);
router.put("/api/update-request", updateRequest);
router.put("/api/cancel", cancelServiceRequest);
router.get("/api/requests/:customerId", getRequestsByCustomer);
router.get("/api/all-requests", getAllRequests);
router.get("/api/progress-requests", requestToAssign);
router.get("/api/requests-history", requestsHistory);
router.get("/api/dashboard-record", dashboardRecord);

export default router;
