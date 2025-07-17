import Service from "../models/Service.js";

// Add new service
export const addService = async (req, res) => {
  try {
    const { name, description, price, duration, isActive } = req.body;

    const existing = await Service.findOne({ name });

    if (existing) {
      return res.status(400).json({ message: "Service already exists" });
    }

    const newService = new Service({
      name,
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

// Update service
export const updateService = async (req, res) => {
  try {
    const updatedData = req.body.newData;


    const updatedService = await Service.findByIdAndUpdate(updatedData.id, updatedData, {
      new: true,
    });

    if (!updatedService) {
      return res.status(404).json({ updated: false, message: "Service not found" });
    }

    res.status(200).json({ updated: true, service: updatedService });
  } catch (err) {
    console.error("Error updating service:", err);
    res.status(500).json({ updated: false, message: "Internal server error" });
  }
};

// Delete service
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Service.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ deleted: false, message: "Service not found" });
    }

    res.status(200).json({ deleted: true, service: deleted });
  } catch (err) {
    console.error("Error deleting service:", err);
    res.status(500).json({ deleted: false, message: "Internal server error" });
  }
};

export const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 }); // newest first

    return res.status(200).json(services);

  } catch (error) {
    console.error('Failed to fetch services:', error);
    res.status(500).json({ message: 'Server Error: Failed to fetch services' });
  }
};

export default { 
    addService, 
    updateService,
    deleteService,
    getServices
}
