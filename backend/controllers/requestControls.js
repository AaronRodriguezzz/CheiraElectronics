import ServiceRequest from "../models/ServiceRequest.js";

// ✅ Create a new service request
export const createServiceRequest = async (req, res) => {
  try {
    const { customerId, serviceType, message } = req.body;
    console.log(req.body);
    const newRequest = new ServiceRequest({
      customer: customerId,
      serviceType,
      message,
    });

    const saved = await newRequest.save();
    return res.status(200).json(saved);
    
  } catch (err) {
    console.error("Error creating service request:", err);
    return res.status(500).json({ error: "Failed to create request" });
  }
};

// ✅ Update status (admin or technician)
export const updateServiceRequestStatus = async (req, res) => {
  try {
    const { id, status } = req.body.newData;

    const updated = await ServiceRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Request not found" });
    }

    return res.status(200).json(updated);
  } catch (err) {
    console.error("Error updating request status:", err);
    res.status(500).json({ error: "Failed to update status" });
  }
};

// ✅ Cancel a request (by customer)
export const cancelServiceRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await ServiceRequest.findByIdAndUpdate(
      id,
      { status: "Cancelled" },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Request not found" });
    }

    return res.status(200).json(updated);
  } catch (err) {
    console.error("Error cancelling request:", err);
    res.status(500).json({ error: "Failed to cancel request" });
  }
};

// ✅ (Optional) Get all requests for a customer
export const getRequestsByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const requests = await ServiceRequest.find({ customer: customerId }).sort({ createdAt: -1 });

    return res.status(200).json(requests);
  } catch (err) {
    console.error("Error getting requests:", err);
    res.status(500).json({ error: "Failed to retrieve requests" });
  }
};

export const getAllRequests = async (req,res) => {
  try{
    const requests = await ServiceRequest.find({status: 'Pending'}).populate('customer');
    
    return res.status(200).json(requests);

  }catch(err){
    console.error("Error getting requests:", err);
    res.status(500).json({ error: "Failed to retrieve requests" });
  }
}
export default {
    createServiceRequest,
    updateServiceRequestStatus,
    cancelServiceRequest,
    getRequestsByCustomer,
    getAllRequests
}