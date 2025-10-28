import mongoose from "mongoose";

const ServiceRequestSchema = new mongoose.Schema({
    customer: {
        type: String,
        required: true,
    },
    technician: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Technician",    
    },
    serviceType: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
    },
    model: {
        type: String,
        required: true,
    },
    deviceType: {
        type: String,
        required: true,
    },
    description: String,
    servicePrice: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,       
        enum: ["Pending", "In Progress", "Completed", "Reopened", "Rejected"],
        default: "Pending", 
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",    
    },
    remarks: String,
    submittedAt: { 
        type: Date, 
        default: Date.now 
    },
    completedAt: Date,

}, { timestamps: true });

export default mongoose.model("ServiceRequest", ServiceRequestSchema);
