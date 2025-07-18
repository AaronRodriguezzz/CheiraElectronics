import Customer from "../models/Customer.js";
import ServiceRequest from "../models/ServiceRequest.js"; // You need to have this schema
import bcrypt from "bcrypt";

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

// 3. Update Customer Info
export const updateCustomerInfo = async (req, res) => {
  try {
    const { customerId, full_name, contact_number, address } = req.body;

    const updated = await Customer.findByIdAndUpdate(
      customerId,
      { full_name, contact_number, address },
      { new: true }
    );

    res.json({ customer: updated });
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
}