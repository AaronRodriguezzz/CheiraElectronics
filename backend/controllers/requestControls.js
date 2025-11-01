import ServiceRequest from "../models/ServiceRequest.js";
import WalkInRequests from "../models/WalkInCustomer.js";
import Technician from "../models/Technician.js";
import { send_request_update } from "../utils/sendEmail.js";

// ✅ Create a new service request
export const createServiceRequest = async (req, res) => {
    
  const { 
    customerId, 
    serviceCategory,
    deviceType,
    description,
    serviceType,
    model
  } = req.body;

  if(!customerId || !serviceCategory || !deviceType || !description || !serviceType || !model){
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

    const newRequest = new ServiceRequest({
      customer: customerId, 
      serviceCategory,
      deviceType,
      description,
      serviceType,
      model
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

export const updateFeedback = async (req, res) => {
  try {
    const { requestId, rating, feedback } = req.body.newData;
    

    const request = await ServiceRequest.findById(requestId);

    if(request.status !== 'Completed'){
      return res.status(400).json({ error: "Cannot leave feedback on incomplete request" });
    }

    const updated = await ServiceRequest.findByIdAndUpdate(
      requestId,
      { feedbackRating: rating, feedbackMessage: feedback },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Request not found" });
    }

    return res.status(200).json(updated);
  } catch (err) {
    console.error("Error updating feedback:", err);
    res.status(500).json({ error: "Failed to update feedback" });
  }
};

export const acceptRequests = async (req, res) => {

  const { id, email, serviceType, status, technician, servicePrice, remarks, downPayment } = req.body.newData;

  console.log(req.body.newData)

  if (!id || !status || !technician || !remarks) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const updated = await ServiceRequest.findByIdAndUpdate(
      id,
      { status, technician, downPayment, servicePrice, remarks},
      { new: true } 
    ).populate('technician customer');

    if (!updated) {
      return res.status(404).json({ error: "Request not found" });
    } 

    console.log(updated);

    await send_request_update(id,updated.customer.email,serviceType,status);

    return res.status(200).json(updated);
  } catch (err) {
    console.error("Error updating request status:", err);
    res.status(500).json({ error: "Failed to update status" });
  }
};

export const updateRequest = async (req, res) => {

  const { id, status, remarks, updatedBy} = req.body.newData;

  console.log(req.body.newData)

  if (!id || !status || !remarks || !updatedBy) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const updated = await ServiceRequest.findByIdAndUpdate(
      id,
      { 
        status, 
        remarks, 
        updatedBy,
      },
      { new: true }
    ).populate('customer serviceType');

    if (!updated) {
      return res.status(404).json({ error: "Request not found" });
    }

    await send_request_update(id, updated.customer?.email, updated.serviceType,status,remarks)

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

    console.log('Online', request)

    
    return res.status(200).json(request);
  } catch (err) {
    console.error("Error getting requests:", err);
    res.status(500).json({ error: "Failed to retrieve requests" });
  }
};

export const getRequest_ForPickUp = async (req, res) => {
  try {

    const [onlineRequests, walkIns] = await Promise.all([
      ServiceRequest.find({ status: 'For Pick-Up' }).sort({ createdAt: -1 })
        .populate('customer')
        .populate('updatedBy'),
      WalkInRequests.find({ status: 'For Pick-Up' }).sort({ createdAt: -1 })
        .populate('updatedBy'),
    ])
     
    return res.status(200).json({ onlineRequests, walkIns});
  } catch (err) {
    console.error("Error getting requests:", err);
    res.status(500).json({ error: "Failed to retrieve requests" });
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

export const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await ServiceRequest.find({
      feedbackRating: { $ne: 0 }
    })
      .populate('customer')
      .sort({ createdAt: -1 });
    
      console.log(feedbacks);
    res.status(200).json(feedbacks);
  }catch(err){
    console.error("Error getting requests:", err);
    res.status(500).json({ error: "Failed to retrieve requests" });
  }
};


export const dashboardRecord = async (req, res) => {
  try {
    const { filter = "daily" } = req.query;

    // 🧩 Date Range Handling
    const now = new Date();
    let startDate;

    if (filter === "yearly") {
      startDate = new Date(now.getFullYear(), 0, 1);
    } else if (filter === "monthly") {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    } else {
      // daily
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }

    // 🧩 Combine both ServiceRequest and WalkInRequests collections
    const combinedRequests = await Promise.all([
      ServiceRequest.find({ createdAt: { $gte: startDate } }),
      WalkInRequests.find({ createdAt: { $gte: startDate } })
    ]);

    const allRequests = [...combinedRequests[0], ...combinedRequests[1]];

    // 🧮 Status summary
    const statusCounts = {
      Pending: 0,
      "In Progress": 0,
      Completed: 0,
      Reopened: 0,
    };

    allRequests.forEach((req) => {
      if (statusCounts[req.status] !== undefined) {
        statusCounts[req.status]++;
      }
    });

    const statusSummaryData = Object.entries(statusCounts).map(([label, count]) => ({
      label,
      count,
    }));

    // 🧮 Service Availed Summary (Top Services)
    const serviceAvailsSummary = await ServiceRequest.aggregate([
      {
        $match: { createdAt: { $gte: startDate } },
      },
      {
        $group: {
          _id: "$serviceCategory",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          serviceName: "$_id",
          count: 1,
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    // 🧮 Sales Summary (Line Chart)
    const formatBy =
      filter === "yearly"
        ? "%Y-%m"
        : filter === "monthly"
        ? "%Y-%m-%d"
        : "%Y-%m-%dT%H:00:00Z";

    const onlineSales = await ServiceRequest.aggregate([
      { $match: { status: "Completed", createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: {
            $dateToString: { format: formatBy, date: "$createdAt" },
          },
          totalRevenue: { $sum: "$servicePrice" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const walkInSales = await WalkInRequests.aggregate([
      { $match: { status: "Completed", createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: {
            $dateToString: { format: formatBy, date: "$createdAt" },
          },
          totalRevenue: { $sum: "$servicePrice" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Combine online and walk-in sales data
    const salesSummaryMap = new Map();

    [...onlineSales, ...walkInSales].forEach((entry) => {
      if (!salesSummaryMap.has(entry._id)) {
        salesSummaryMap.set(entry._id, 0);
      }
      salesSummaryMap.set(entry._id, salesSummaryMap.get(entry._id) + entry.totalRevenue);
    });

    const salesSummary = Array.from(salesSummaryMap, ([key, value]) => ({
      _id: key,
      totalRevenue: value,
    }));

    // 🧮 Walk-in vs Online Requests
    const walkInCount = await WalkInRequests.countDocuments({
      createdAt: { $gte: startDate },
    });
    const onlineCount = await ServiceRequest.countDocuments({
      createdAt: { $gte: startDate },
    });

    const requestComparison = [
      { label: "Walk-In", count: walkInCount },
      { label: "Online", count: onlineCount },
    ];

    // 🧮 Technician Performance
    const technicianPerformance = await Technician.aggregate([
      {
        $lookup: {
          from: "servicerequests",
          localField: "_id",
          foreignField: "technician",
          as: "onlineRequests",
        },
      },
      {
        $lookup: {
          from: "walkinrequests",
          localField: "_id",
          foreignField: "technician",
          as: "walkInRequests",
        },
      },
      {
        $project: {
          full_name: 1,
          totalCompleted: {
            $size: {
              $filter: {
                input: { $concatArrays: ["$onlineRequests", "$walkInRequests"] },
                as: "req",
                cond: { $eq: ["$$req.status", "Completed"] },
              },
            },
          },
          totalFailed: {
            $size: {
              $filter: {
                input: { $concatArrays: ["$onlineRequests", "$walkInRequests"] },
                as: "req",
                cond: { $eq: ["$$req.status", "Rejected"] },
              },
            },
          },
        },
      },
    ]);

    // 🧮 Average Feedback Rating
    const feedbackRatings = await ServiceRequest.aggregate([
      { $match: { feedbackRating: { $exists: true, $ne: null }, status: 'Completed' } },
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$feedbackRating" },
        },
      },
    ]);

    const averageRating = feedbackRatings[0]?.avgRating?.toFixed(1) || 0;

    // ✅ Final Response
    return res.status(200).json({
      statusSummaryData,
      serviceAvailsSummary,
      salesSummary,
      requestComparison,
      technicianPerformance: technicianPerformance.map((t) => ({
        technician: t.full_name,
        completed: t.totalCompleted,
        failed: t.totalFailed,
      })),
      averageRating,
    });
  } catch (err) {
    console.error("Error in dashboardRecord:", err);
    res.status(500).json({ error: "Failed to retrieve dashboard data" });
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
  requestsHistory,
  dashboardRecord
}