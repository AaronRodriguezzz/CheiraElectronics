import Service from "../models/Service.js";

/**
 * Add a new service
 */
export const addService = async (req, res) => {
  try {
    const { serviceCategory, description, price, duration, isActive } = req.body;

    // Prevent duplicate entries based on category + description
    const existing = await Service.findOne({ serviceCategory, description });

    if (existing) {
      return res.status(400).json({ added: false, message: "Service already exists" });
    }

    const newService = new Service({
      serviceCategory,
      description,
      price,
      duration,
      isActive,
    });

    await newService.save();

    return res.status(200).json({ added: true, service: newService });
  } catch (err) {
    console.error("Error adding service:", err);
    res.status(500).json({ added: false, message: "Internal server error" });
  }
};

/**
 * Update an existing service
 */
export const updateService = async (req, res) => {
  try {
    const updatedData = req.body.newData;

    console.log(req.body)

    if (!updatedData?.id) {
      return res.status(400).json({ updated: false, message: "Missing service ID" });
    }

    const updatedService = await Service.findByIdAndUpdate(
      updatedData.id,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedService) {
      return res.status(404).json({ updated: false, message: "Service not found" });
    }

    res.status(200).json({ updated: true, service: updatedService });
  } catch (err) {
    console.error("Error updating service:", err);
    res.status(500).json({ updated: false, message: "Internal server error" });
  }
};

/**
 * "Delete" a service — Soft delete (set isActive = false)
 */
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ deleted: false, message: "Service not found" });
    }

    // Instead of deleting, mark as inactive
    service.isActive = false;
    await service.save();

    res.status(200).json({ deleted: true, service });
  } catch (err) {
    console.error("Error deactivating service:", err);
    res.status(500).json({ deleted: false, message: "Internal server error" });
  }
};

/**
 * Get all services
 */
export const getServices = async (req, res) => {
  try {
    const { showInactive } = req.query;

    // If showInactive=true, include all; otherwise, only active
    const filter = showInactive === "true" ? {} : { isActive: true };

    const services = await Service.find(filter).sort({ createdAt: -1 });

    return res.status(200).json(services);
  } catch (error) {
    console.error("Failed to fetch services:", error);
    res.status(500).json({ message: "Server Error: Failed to fetch services" });
  }
};

export default {
  addService,
  updateService,
  deleteService,
  getServices,
};
