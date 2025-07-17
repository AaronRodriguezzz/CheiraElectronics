import mongoose from "mongoose";

const TechnicianSchema = new mongoose.Schema({
    full_name: { 
        type: String, 
        required: true,
        unique: true
    },
    email: { 
        type: String, 
        required: true 
    },
    contact_number: { 
        type: String, 
        required: true
    },
    status: { 
        type: String, 
        default: "Active",
        enum: ['Active', 'Inactive', 'Removed']
    },
}, { timestamps: true });

export default mongoose.model("Technician", TechnicianSchema);
