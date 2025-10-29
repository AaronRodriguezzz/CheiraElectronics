import mongoose from "mongoose";

const ServiceRequestSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",    
    },
    technician: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Technician",    
    },
    serviceCategory: { 
        type: String,
        required: true
    },
    serviceType: {
        type: String, 
        required: true,
        enum: ['HOME SERVICE', 'DEVICE DROPOFF']
    },
    deviceType: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
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
    feedbackRating: { 
        type: Number, 
        min: 1, 
        max: 5,
    },
    type: {
        type: String,
        default: 'Online-Requests'
    }
}, { timestamps: true });

export default mongoose.model("ServiceRequest", ServiceRequestSchema);
