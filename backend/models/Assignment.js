const AssignmentSchema = new mongoose.Schema({
  request_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceRequest",
    required: true,
  },
  technician_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Technician",
    required: true,
  },
  assigned_at: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("Assignment", AssignmentSchema);
