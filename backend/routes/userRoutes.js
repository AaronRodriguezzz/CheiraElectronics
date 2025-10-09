import express from "express";
import {
  registerCustomer,
  submitServiceRequest,
  updateCustomerInfo,
  deleteCustomerAccount,
  updatePassword
} from "../controllers/userControls.js";
import verifyToken from "../middleware/tokenVerification.js";

const router = express.Router();

router.post("/api/register", registerCustomer);
router.post("/api/service-request", verifyToken, submitServiceRequest);
router.put("/api/update-info", verifyToken, updateCustomerInfo);
router.delete("/api/delete/:customerId", verifyToken, deleteCustomerAccount);
router.put("/api/update-password/:userId",verifyToken, updatePassword);

export default router