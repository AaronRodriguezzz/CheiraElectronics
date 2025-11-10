import Technician from '../models/Technician.js';

// ✅ ADD Technician
export const addTechnician = async (req, res) => {
  try {
    const { full_name, email, contact_number } = req.body;

    // Input validation
    if (!full_name || !email || !contact_number) {
      return res.status(400).json({ added: false, message: 'All fields are required.' });
    }

    // Duplicate check
    const existing = await Technician.findOne({
      $or: [{ email }, { full_name }]
    });

    if (existing) {   
      return res.status(409).json({ added: false, message: 'Technician already exists.' });
    }

    const technician = new Technician(req.body);
    await technician.save();

    res.status(200).json({ added: true, technician });
  } catch (error) {
    res.status(500).json({ added: false, message: 'Server error: ' + error.message });
  }
};

// ✏️ UPDATE Technician
export const updateTechnician = async (req, res) => {
  try {
    console.log(req.body);
    const { id, full_name, email, contact_number, status } = req.body.newData;
    // Input validation
    if (!full_name || !email || !contact_number || !status) {
      return res.status(400).json({ updated: false, message: 'All fields are required.' });
    }

    const technician = await Technician.findById(id);
    
    if (!technician) {
      return res.status(404).json({ updated: false, message: 'Technician not found.' });
    }

    // Check for email or full_name conflicts
    const duplicate = await Technician.findOne({
      _id: { $ne: id },
      $or: [{ email }, { full_name }]
    });

    if (duplicate) {
      return res.status(409).json({ updated: false, message: 'Another technician with this email or name already exists.' });
    }

    technician.full_name = full_name;
    technician.email = email;
    technician.contact_number = contact_number;
    technician.status = status;

    const updatedTech = await technician.save();

    return res.status(200).json({ updated: true, technician: updatedTech });

  } catch (error) {
    return res.status(500).json({ updated: false, message: 'Server error: ' + error.message });
  }
};

// 🔒 SOFT DELETE Technician (status = Removed)
export const removeTechnician = async (req, res) => {
  try {
    const { id } = req.params;

    const technician = await Technician.findById(id);

    if (!technician) {
      return res.status(404).json({ removed: false, message: 'Technician not found.' });
    }

    technician.status = 'Inactive';
    const updated = await technician.save();

    res.status(200).json({ updated: true, technician: updated });
  } catch (error) {
    res.status(500).json({ removed: false, message: 'Server error: ' + error.message });
  }
};

export const getTechnicians = async (req, res) => {
  try {
    const technicians = await Technician.find().sort({ createdAt: -1 }); // newest first

    return res.status(200).json(technicians);

  } catch (error) {
    console.error('Failed to fetch services:', error);
    res.status(500).json({ message: 'Server Error: Failed to fetch services' });
  }
};

export default {
    addTechnician,
    updateTechnician,
    removeTechnician,
    getTechnicians
}