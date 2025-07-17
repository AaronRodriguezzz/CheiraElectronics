import mongoose from "mongoose";
import bcrypt from "bcrypt";

const CustomerSchema = new mongoose.Schema({
    full_name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    }, // Optional if not using auth
    contact_number: { 
        type: String, 
        required: true 
    },
    address: { 
        type: String 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

export default mongoose.model("Customer", CustomerSchema);
