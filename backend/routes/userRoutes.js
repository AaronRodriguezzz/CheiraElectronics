import express from "express";
import {
  registerCustomer,
  submitServiceRequest,
  updateCustomerInfo,
  deleteCustomerAccount,
  updatePassword
} from "../controllers/userControls.js";

const router = express.Router();

router.post("/api/register", registerCustomer);
router.post("/api/service-request", submitServiceRequest);
router.put("/api/update-info", updateCustomerInfo);
router.delete("/api/delete/:customerId", deleteCustomerAccount);
router.put("/api/update-password/:userId", updatePassword);

export default router