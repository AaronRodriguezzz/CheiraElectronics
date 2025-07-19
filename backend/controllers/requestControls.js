import ServiceRequest from "../models/ServiceRequest.js";

// ✅ Create a new service request
export const createServiceRequest = async (req, res) => {
  try {
    const { customerId, serviceType, description } = req.body;

    const newRequest = new ServiceRequest({
      customer: customerId,
      serviceType,
      description,
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
    const id = req.params.id
    const { status } = req.body.newData;

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

export const acceptRequests = async (req, res) => {
  try {
    const { id, status, technician } = req.body.newData;

    if (!id || !status || !technician) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const updated = await ServiceRequest.findByIdAndUpdate(
      id,
      { status, technician },
      { new: true }
    ).populate('technician customer'); // Optional: return full technician & customer data

    if (!updated) {
      return res.status(404).json({ error: "Request not found" });
    }

    return res.status(200).json(updated);
  } catch (err) {
    console.error("Error updating request status:", err);
    res.status(500).json({ error: "Failed to update status" });
  }
};

export const updateRequest = async (req, res) => {
  try {
    const { id, status, remarks, updatedBy, price } = req.body.newData;
    console.log('missing', id, status, remarks, updatedBy);

    if (!id || !status || !remarks || !updatedBy) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const updated = await ServiceRequest.findByIdAndUpdate(
      id,
      { 
        status, 
        remarks, 
        updatedBy,
        ...(price != null && { price })
      },
      { new: true }
    ).populate('customer');

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
    const requests = await ServiceRequest.find({status: 'Pending'})
      .populate('customer')    
    
    return res.status(200).json(requests);

  }catch(err){
    console.error("Error getting requests:", err);
    res.status(500).json({ error: "Failed to retrieve requests" });
  }
}

export const requestToAssign = async (req, res) => {
  try {
    const requests = await ServiceRequest.find({ 
      status: { $in: ['In Progress', 'Reopened'] } 
    })
      .populate('customer')
      .populate('technician');


    return res.status(200).json(requests);
  } catch (err) {
    console.error("Error getting requests:", err);
    res.status(500).json({ error: "Failed to retrieve requests" });
  }
};

export const requestsHistory = async (req, res) => {
  try {

    const [finishedRequest, rejectedRequest] = await Promise.all([
      ServiceRequest.find({ status: { $in: ['Completed', 'Failed'] } })
        .populate('customer')
        .populate('technician')
        .populate('updatedBy'),

      ServiceRequest.find({ status: { $in: 'Rejected' } })
        .populate('customer')
        .populate('updatedBy')
    ]);


    const request = [...finishedRequest, ...rejectedRequest];

    
    return res.status(200).json(request);
  } catch (err) {
    console.error("Error getting requests:", err);
    res.status(500).json({ error: "Failed to retrieve requests" });
  }
};

export default {
  createServiceRequest,
  updateServiceRequestStatus,
  acceptRequests,
  updateRequest,
  cancelServiceRequest,
  getRequestsByCustomer,
  getAllRequests,
  requestToAssign,
  requestsHistory
}