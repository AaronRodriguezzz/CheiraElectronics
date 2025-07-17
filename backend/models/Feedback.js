const FeedbackSchema = new mongoose.Schema({
    request_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServiceRequest",
    },
    rating: { 
        type: Number, 
        min: 1, max: 5, 
        required: true 
    },
    comment: { 
        type: String, 
        maxlength: 100 
    },
    submittedAt: { 
        type: Date, 
        default: Date.now 
    },
}, { timestamps: true });

export default mongoose.model("Feedback", FeedbackSchema);
