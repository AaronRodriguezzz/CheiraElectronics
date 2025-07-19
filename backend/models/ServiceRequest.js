import mongoose from "mongoose";

const ServiceRequestSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",    
        required: true
    },
    technician: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Technician",    
    },
    serviceType: { 
        type: String, 
        required: true 
    },
    description: String,
    servicePrice: Number,
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
}, { timestamps: true });

export default mongoose.model("ServiceRequest", ServiceRequestSchema);
