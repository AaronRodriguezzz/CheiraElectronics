import Admin from "../models/AdminAccount.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
// Create a new admin
export const addAdmin = async (req, res) => {
  
  try {
    const { full_name, email, password, role, status, updatedBy } = req.body;
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
      updatedBy
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

export const updateAdmin = async (req, res) => {
  try {
    const { id, email, full_name, password, currentPassword, updatedBy } = req.body.newData;

    if (!id) {
      return res.status(400).json({ message: 'Admin ID is required' });
    }

    // Check if email is already used by another admin
    if (email) {
      const existing = await Admin.findOne({ email, _id: { $ne: id } });
      if (existing) {
        return res.status(400).json({ message: 'Email already taken by another account.' });
      }
    }

    const updatedData = { full_name, email, updatedBy};

    // If new password is being set, validate the current one
    if (password) {
      const user = await Admin.findById(id).select('+password');

      if (!user) {
        return res.status(404).json({ message: 'Admin not found.' });
      }

      const matched = await bcrypt.compare(currentPassword, user.password);
      if (!matched) {
        return res.status(400).json({ message: 'Current password is incorrect.' });
      }

      updatedData.password = await bcrypt.hash(password, 10);
    }


    // Update the admin document
    const updatedAdmin = await Admin.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedAdmin) {
      return res.status(404).json({ message: 'Admin not found.' });
    }

    // Omit password from the response
    const { password: _, ...adminData } = updatedAdmin.toObject();

    const token = jwt.sign(
      adminData,
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );  
    
    res.cookie('admin_token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production' // Only secure in production
    });

    return res.status(200).json({
      message: 'Admin updated successfully.',
      admin: adminData,
    });

  } catch (error) {
    console.error('Update Admin Error:', error);
    return res.status(500).json({ message: 'Error updating admin', error });
  }
};



// Mark admin as Removed
export const deactivateAccount = async (req, res) => {
  try {
    const adminId = req.params.id;
    const updatedBy = req.body.newData.updatedBy;

    const removedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      { status: "Inactive", updatedBy },
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
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch admins", error });
  }
};


export default {
    addAdmin,
    updateAdmin,
    deactivateAccount,
    getAllAdmins
}