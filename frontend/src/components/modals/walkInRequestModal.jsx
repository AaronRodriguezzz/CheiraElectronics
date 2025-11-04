import React, { useEffect, useState } from "react";
import { post_data } from "../../services/PostMethod";
import { get_data } from "../../services/getMethod";
import { serviceCategories } from "../../data/ServiceCategory";
import { deviceBrands } from "../../data/DeviceBrands";

const AddWalkInCustomerModal = ({ onCancel, updatedData }) => {
  const [technicians, setTechnicians] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    customer: "",
    contactNumber: "",
    email: "",
    technician: "",
    model: "",
    serviceCategory: "",
    remarks: "",
    servicePrice: "",
    downPayment: "",
  });

  // ✅ Fetch available technicians
  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const techs = await get_data("/technicians");
        setTechnicians(techs || []);
      } catch (err) {
        console.error("Error loading technicians:", err);
      }
    };
    fetchTechnicians();
  }, []);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Reset device type when service category changes
    if (name === "serviceCategory") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        deviceType: "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { customer, deviceType, model } = formData;
    if (!customer || !deviceType || !model) return;

    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        status: "In Progress",
      };

      const response = await post_data("/walkin", payload);

      if (response) {
        updatedData((prev) => [
          {
            ...response,
            technicianName: response.technician?.full_name,
          },
          ...prev,
        ]);
        setFormData({ 
          customer: "",
          contactNumber: "",
          email: "",
          technician: "",
          model: "",
          serviceCategory: "",
          remarks: "",
          servicePrice: "",
          downPayment: "",
        })
        onCancel(false);
      }
    } catch (err) {
      console.error("Error creating walk-in request:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen fixed top-0 left-0 z-50 bg-black/30 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-[90%] max-w-[450px] bg-white p-6 rounded shadow"
      >
        <h2 className="text-2xl text-orange-500 font-semibold mb-6">
          New Walk-In Request
        </h2>

        <div className="space-y-3">
          {/* Customer name */}
          <input
            type="text"
            name="customer"
            placeholder="Customer Name"
            value={formData.customer}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded placeholder:text-black"
          />

          {/* Contact number */}

          <div className="flex gap-2"> 

            <input
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded placeholder:text-black"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded placeholder:text-black"
            />

          </div>

          {/* Category & Device Type */}
          <div className="flex gap-x-2">
            <select
              name="serviceCategory"
              value={formData.serviceCategory}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded bg-white"
            >
              <option value="">Select Category</option>
              {serviceCategories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              name="deviceType"
              onChange={handleChange}
              value={formData.deviceType}
              disabled={!formData.serviceCategory}
              className="w-full border px-3 py-2 rounded bg-white disabled:opacity-50 disabled:cursor-not-allowed"
              required
            >
              <option value="">Select Device Type</option>
              {formData.serviceCategory &&
                (deviceBrands[formData.serviceCategory] || []).map(
                  (brand, index) => (
                    <option key={index} value={brand}>
                      {brand}
                    </option>
                  )
                )}
            </select>
          </div>

          {/* Model */}
          <input
            type="text"
            name="model"
            placeholder="Device Model"
            value={formData.model}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded placeholder:text-black"
          />

          {/* Technician (optional) */}
          <select
            name="technician"
            value={formData.technician}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded bg-white"
          >
            <option value="">Assign Technician</option>
            {technicians.map((tech) => (
              <option key={tech._id} value={tech._id}>
                {tech.full_name}
              </option>
            ))}
          </select>

          {/* Price */}

          <div className="flex gap-2  ">
            <input
              type="number"
              name="servicePrice"
              placeholder="Service Price"
              value={formData.servicePrice}
              onChange={handleChange}
              min="0"
              className="w-full border px-3 py-2 rounded placeholder:text-black"
            />

            <input
              type="number"
              name="downPayment"
              placeholder="Down Payment"
              value={formData.downPayment}
              onChange={handleChange}
              disabled={formData.servicePrice === 0}
              min={formData.servicePrice * 0.20}
              max={formData.servicePrice}
              className="w-full border px-3 py-2 rounded placeholder:text-black"
            />
          </div>
          

          {/* Remarks */}
          <textarea
            name="remarks"
            placeholder="Remarks"
            value={formData.remarks}
            onChange={handleChange}
            rows={3}
            className="w-full border px-3 py-2 rounded placeholder:text-black"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-5">
          <button
            type="button"
            onClick={() => onCancel(false)}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddWalkInCustomerModal;
