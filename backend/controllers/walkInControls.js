import mongoose from "mongoose";
import WalkInRequest from "../models/WalkInCustomer.js";
import Technician from "../models/Technician.js";

/**
 * @desc Create a new walk-in service request
 * @route POST /api/service-requests/walkin
 */
export const createWalkInRequest = async (req, res) => {
  try {
    const {
      customer,
      contactNumber,
      email,
      technician,
      model,
      serviceCategory,
      deviceType,
      remarks,
      servicePrice,
    } = req.body;

    // === VALIDATION ===
    if (!customer || !deviceType || !model) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // === SAFE PAYLOAD ===
    const payload = {
      customer: String(customer).trim(),
      contactNumber: contactNumber ? String(contactNumber).trim() : "",
      email: email ? String(email).trim().toLowerCase() : "",
      technician: technician || null,
      model: String(model).trim(),
      serviceCategory: String(serviceCategory || "").trim(),
      deviceType: String(deviceType || "").trim(),
      remarks: remarks ? String(remarks).trim() : "",
      servicePrice: servicePrice || 0,
      status: "In Progress",
    };

    const newRequest = new WalkInRequest(payload);
    const savedRequest = await newRequest.save();
    const populated = await savedRequest.populate("technician", "full_name");

    return res.status(201).json(populated);
  } catch (error) {
    console.error("Error creating walk-in request:", error);
    return res
      .status(500)
      .json({ message: "Server error while creating request." });
  }
};

/**
 * @desc Get all walk-in service requests
 * @route GET /api/service-requests/walkin
 */
export const getFinishedWalkIns = async (req, res) => {
  try {
    
    const walkInsHistory = await WalkInRequest.find({ status: { $in: ['Completed', 'Failed', 'Cancelled'] } })
        .populate('technician')
        .populate('updatedBy')
      

    console.log('Walk in', walkInsHistory)
    return res.status(200).json(walkInsHistory);
  } catch (error) {
    console.error("Error fetching walk-in requests:", error);
    return res
      .status(500)
      .json({ message: "Server error while fetching walk-ins." });
  }
};

/**
 * @desc Get all walk-in service requests
 * @route GET /api/service-requests/walkin
 */
export const getInProgressWalkIns = async (req, res) => {
  try {
    const walkIns = await WalkInRequest.find({ status: 'In Progress'})
      .populate("technician")
      .sort({ createdAt: -1 });

    console.log(walkIns)

    return res.status(200).json(walkIns);
  } catch (error) {
    console.error("Error fetching walk-in requests:", error);
    return res
      .status(500)
      .json({ message: "Server error while fetching walk-ins." });
  }
};

/**
 * @desc Update a walk-in service request (assign technician, update status, etc.)
 * @route PUT /api/service-requests/walkin/:id
 */
export const updateWalkInRequest = async (req, res) => {
  try {
    const { id, remarks, updatedBy } = req.body.newData;

    const updated = await WalkInRequest.findByIdAndUpdate(
      id,
      {
        status: 'Completed',
        remarks: remarks ? String(remarks).trim() : "",
        updatedBy
      },
      { new: true }
    )

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating walk-in request:", error);
    return res
      .status(500)
      .json({ message: "Server error while updating request." });
  }
};
