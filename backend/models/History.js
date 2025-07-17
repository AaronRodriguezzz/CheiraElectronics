const HistorySchema = new mongoose.Schema({
  request_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceRequest",
  },
  customerName: String,
  serviceType: String,
  completedAt: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.model("History", HistorySchema);
