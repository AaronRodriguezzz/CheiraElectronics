const ServiceRequestSchema = new mongoose.Schema({
    customerName: String,
    customerEmail: String,
    serviceType: { 
        type: String, 
        required: true 
    },
    description: String,
    status: {
        type: String,
        enum: ["Pending", "In Progress", "Completed", "Reopened", "Rejected"],
        default: "Pending",
    },
    submittedAt: { 
        type: Date, 
        default: Date.now 
    },
    completedAt: Date,
    feedbackRating: { 
        type: Number, 
        min: 1, 
        max: 5 
    },
}, { timestamps: true });

export default mongoose.model("ServiceRequest", ServiceRequestSchema);
