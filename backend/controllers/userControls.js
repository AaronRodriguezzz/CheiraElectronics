import Customer from "../models/Customer.js";
import ServiceRequest from "../models/ServiceRequest.js"; // You need to have this schema
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// 1. Register New Customer
export const registerCustomer = async (req, res) => {
  try {
    const { full_name, email, password, contact_number, address } = req.body;

    const existing = await Customer.findOne({ email });

    if (existing) return res.status(400).json({ error: "Email already in use." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCustomer = new Customer({
      full_name,
      email,
      password: hashedPassword,
      contact_number,
      address,
    });

    const saved = await newCustomer.save();

    return res.status(200).json({ customer: saved });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. Submit a Service Request
export const submitServiceRequest = async (req, res) => {
  try {
    const { customerId, service, message } = req.body;

    const request = new ServiceRequest({
      customer: customerId,
      service,
      message,
    });

    const savedRequest = await request.save();
    res.status(201).json({ request: savedRequest });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { currentPassword, newPassword } = req.body.newData;

    console.log(req.body.newData , userId);

    const user = await Customer.findById(userId).select("+password");

    console.log(user);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Current password is incorrect." });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;

    await user.save();

    return res.status(200).json({ updated: true, message: "Password updated successfully." });

  }catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

// 3. Update Customer Info
export const updateCustomerInfo = async (req, res) => {
  try {
    const { customerId } = req.body.newData;

    const emailExist = await Customer.findOne({ email: req.body.email, _id: { $ne: customerId } });

    if(emailExist) return res.status(400).json({ error: "Email already in use." });

    const updated = await Customer.findByIdAndUpdate(
      customerId,
      req.body.newData,
      { new: true }
    );

    delete updated.password;

    const token = jwt.sign(
      { user: updated },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );  
    
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production' // Only secure in production
    });

    return res.status(200).json({ customer: updated, message: "Profile updated successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 4. Delete Customer Account
export const deleteCustomerAccount = async (req, res) => {
  try {
    const { customerId } = req.params;

    await Customer.findByIdAndDelete(customerId);
    res.json({ message: "Account deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export default {
  registerCustomer,
  submitServiceRequest,
  updateCustomerInfo,
  deleteCustomerAccount,
  updatePassword
}