import Admin from "../models/AdminAccount.js";
import bcrypt from "bcryptjs";

// Create a new admin
export const addAdmin = async (req, res) => {
  console.log(req.body);

  try {
    const { full_name, email, password, role, status } = req.body;
    // Check required fields
    if (!full_name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Check if email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Email already in use." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      full_name,
      email,
      password: hashedPassword,
      role: role || "Admin",
      status: status || "Active",
    });

    const savedAdmin = await newAdmin.save();

    res.status(200).json({
      message: "Admin created successfully.",
      added: true,
      admin: savedAdmin,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding admin", error });
  }
};

// Update admin details
export const updateAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;
    const updates = req.body;

    if (updates.email) {
      const existing = await Admin.findOne({ email: updates.email, _id: { $ne: adminId } });
      if (existing) {
        return res.status(400).json({ message: "Email already taken by another account." });
      }
    }

    // If password is being updated, hash it
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    } else {
      delete updates.password; // Avoid overwriting with empty value
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updates, { new: true });

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    res.json({
      message: "Admin updated successfully.",
      updated: true,
      admin: updatedAdmin,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating admin", error });
  }
};

// Mark admin as Removed
export const removeAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;

    const removedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      { status: "Removed" },
      { new: true }
    );

    if (!removedAdmin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    res.json({
      message: "Admin status set to Removed.",
      removed: true,
      admin: removedAdmin,
    });
  } catch (error) {
    res.status(500).json({ message: "Error removing admin", error });
  }
};

// (Optional) Get all admins
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().sort({ createdAt: -1 });
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch admins", error });
  }
};


export default {
    addAdmin,
    updateAdmin,
    removeAdmin,
    getAllAdmins
}