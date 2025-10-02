import Service from "../models/Service.js";
import ServiceRequest from "../models/ServiceRequest.js";
import { send_request_update } from "../utils/sendEmail.js";

// ✅ Create a new service request
export const createServiceRequest = async (req, res) => {

  const { 
    customerId, 
    serviceType, 
    model, 
    deviceType, 
    description 
  } = req.body;

  if(!customerId || !serviceType || !model || !deviceType || !description){
    return res.status(400).json({ message: 'All fields are required'})
  }

  try {

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Find requests made by this customer today
    const customerRequestsToday = await ServiceRequest.find({
      customer: customerId,
      submittedAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    if(customerRequestsToday.length >= 3){
      return res.status(400).json({ message: 'You already requested 3 times in a day'})
    }

    const service = serviceType === 'N/A' ? undefined : serviceType

    const newRequest = new ServiceRequest({
      customer: customerId,
      serviceType: service,
      model, 
      deviceType,
      description,
    });

    const savedRequest = await newRequest.save();

    const populatedRequest = await savedRequest.populate('customer serviceType');


    global.sendRequestNotification(populatedRequest);

    return res.status(200).json(populatedRequest);
    
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
    ).populate('customer serviceType'); // Optional: return full technician & customer data

    if (!updated) {
      return res.status(404).json({ error: "Request not found" });
    }

    await send_request_update(updated.id,updated.email,updated.serviceType,status,updated?.remarks)

    return res.status(200).json(updated);
  } catch (err) {
    console.error("Error updating request status:", err);
    res.status(500).json({ error: "Failed to update status" });
  }
};

export const acceptRequests = async (req, res) => {
  try {
    const { id, email, serviceType, status, technician } = req.body.newData;

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


    await send_request_update(id,email,serviceType,status)

    return res.status(200).json(updated);
  } catch (err) {
    console.error("Error updating request status:", err);
    res.status(500).json({ error: "Failed to update status" });
  }
};

export const updateRequest = async (req, res) => {
  try {
    const { id, email, serviceType, status, remarks, updatedBy, servicePrice} = req.body.newData;

    if (!id || !status || !remarks || !updatedBy) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const updated = await ServiceRequest.findByIdAndUpdate(
      id,
      { 
        status, 
        remarks, 
        updatedBy,
        ...(servicePrice != null && { servicePrice })
      },
      { new: true }
    ).populate('customer serviceType'); // Optional: return full technician & customer data

    if (!updated) {
      return res.status(404).json({ error: "Request not found" });
    }


    await send_request_update(id,email,updated.serviceType,status,remarks)

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
    const requests = await ServiceRequest.find({status: 'Pending'}).sort({ createdAt: -1 })
      .populate('customer serviceType');    
    
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
      .populate('customer technician serviceType')
      .sort({ createdAt: -1 });

    return res.status(200).json(requests);
  } catch (err) {
    console.error("Error getting requests:", err);
    res.status(500).json({ error: "Failed to retrieve requests" });
  }
};

export const requestsHistory = async (req, res) => {
  try {

    const [finishedRequest, rejectedRequest] = await Promise.all([
      ServiceRequest.find({ status: { $in: ['Completed', 'Failed', 'Cancelled'] } })
        .populate('customer')
        .populate('technician')
        .populate('serviceType')
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


export const dashboardRecord = async (req,res) => {
  try{
    const [
      pendingRequests,
      inProgressRequests,
      completedRequests,
      reOpenedRequests
    ] = await Promise.all([
      ServiceRequest.countDocuments({ status: 'Pending' }),
      ServiceRequest.countDocuments({ status: 'In Progress' }),
      ServiceRequest.countDocuments({ status: 'Completed' }),
      ServiceRequest.countDocuments({ status: 'Reopened' })
    ]);

    const serviceAvailsSummary  = await ServiceRequest.aggregate([
      {
        $group: {
          _id: "$serviceType",        // Group by status
          count: { $sum: 1 }     // Count documents per status
        }
      },
      {
        $lookup: {
          from: "services",           // The collection to join
          localField: "_id",          // Field from the input documents
          foreignField: "_id",        // Field from the documents of the "from" collection
          as: "serviceDetails"        // Output array field
        }
      },
      {
        $unwind: "$serviceDetails"    // Deconstructs the array field to get object
      },
      {
        $project: {
          _id: 0,
          serviceName: "$serviceDetails.name", // Project desired fields
          count: 1
        }
      }
    ]);

    const salesSummary  = await ServiceRequest.aggregate([
      {
        $match: { status: "Completed" } // Only consider completed requests
      },
      {
        $group: {
         _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },   
          totalRevenue: { $sum: "$servicePrice"} 
        }
      }
    ]);

    const statusSummaryData = [
      { label: "Pending", count: pendingRequests },
      { label: "In Progress", count: inProgressRequests },
      { label: "Completed", count: completedRequests },
      { label: "Re-opened", count: reOpenedRequests },
    ]

    return res.status(200).json({
      statusSummaryData,
      serviceAvailsSummary,
      salesSummary
    });

  }catch(err){
    console.error("Error getting requests:", err);
    res.status(500).json({ error: "Failed to retrieve requests" });
  }
}

export default {
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
}