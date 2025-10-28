import ServiceRequest from "../models/ServiceRequest.js";
import Technician from "../models/Technician.js";
import Service from "../models/Service.js";
import Admin from "../models/Admin.js";

/**
 * @desc Create a new walk-in service request
 * @route POST /api/service-requests/walkin
 */
export const createWalkInRequest = async (req, res) => {
  try {
    const {
      customer,
      technician,
      serviceType,
      model,
      deviceType,
      description,
      servicePrice,
    } = req.body;

    if (!customer || !model || !deviceType || !serviceType) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const newRequest = new ServiceRequest({
      customer,
      technician: technician || null,
      serviceType,
      model,
      deviceType,
      description,
      servicePrice: servicePrice || 0,
      status: "Pending",
      submittedAt: new Date(),
    });

    const savedRequest = await newRequest.save();

    // Populate references for front-end display
    const populated = await savedRequest
      .populate("technician", "full_name")
      .populate("serviceType", "service_name");

    res.status(201).json(populated);
  } catch (error) {
    console.error("Error creating walk-in request:", error);
    res.status(500).json({ message: "Server error while creating request." });
  }
};

/**
 * @desc Update a service request (assign technician, update status, etc.)
 * @route PUT /api/service-requests/update
 */
export const updateServiceRequest = async (req, res) => {
  try {
    const { id, technician, servicePrice, status, updatedBy, remarks } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Request ID is required." });
    }

    const existingRequest = await ServiceRequest.findById(id);

    if (!existingRequest) {
      return res.status(404).json({ message: "Service request not found." });
    }

    // Update fields dynamically
    if (technician) existingRequest.technician = technician;
    if (servicePrice !== undefined) existingRequest.servicePrice = servicePrice;
    if (status) existingRequest.status = status;
    if (remarks) existingRequest.remarks = remarks;
    if (updatedBy) existingRequest.updatedBy = updatedBy;

    // If status is "Completed", mark completion date
    if (status === "Completed") {
      existingRequest.completedAt = new Date();
    }

    const updatedRequest = await existingRequest.save();

    const populated = await updatedRequest
      .populate("technician", "full_name")
      .populate("serviceType", "service_name")
      .populate("updatedBy", "name");

    res.status(200).json(populated);
  } catch (error) {
    console.error("Error updating service request:", error);
    res.status(500).json({ message: "Server error while updating request." });
  }
};
