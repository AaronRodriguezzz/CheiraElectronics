// models/Admin.js
import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true, 
    select: false, 
  },
  role: {
    type: String,
    enum: ['Super Admin', 'Admin', 'Support'],
    default: 'Admin',
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
}, {
  timestamps: true // adds createdAt and updatedAt
});

export default mongoose.model("Admin", AdminSchema);
