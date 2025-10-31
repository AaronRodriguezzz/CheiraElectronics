import mongoose from "mongoose";

const ServiceRequestSchema = new mongoose.Schema({
    customer: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    technician: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Technician",    
    },
    serviceCategory: { 
        type: String,
        required: true,
    },
    deviceType: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    downPayment: {
        type: Number,
        default: 0,
    },
    servicePrice: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,       
        enum: ["Pending", "In Progress", "Completed", "For Pick-Up", "Reopened", "Rejected"],
        default: "In Progress", 
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
    type: {
        type: String,
        default: 'Walk-In'
    },
    completedAt: Date,

}, { timestamps: true });

export default mongoose.model("WalkInRequests", ServiceRequestSchema);
