import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    serviceCategory: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    price: {
      type: String,
      required: true,
      min: 0,
      trim: true,
    },
    duration: {
      type: String, // e.g., "30 mins", "1 hour"
      default: '',
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Services", ServiceSchema);
