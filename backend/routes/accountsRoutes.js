import express from "express";
const router = express.Router();
import {
    addAdmin,
    updateAdmin,
    removeAdmin,
    getAllAdmins
} from "../controllers/accountControls.js";

router.post("/api/new-account", addAdmin);
router.put("/api/update-account", updateAdmin);
router.delete("/api/delete-account/:id", removeAdmin);
router.get("/api/accounts", getAllAdmins);

export default router;
