import React, { useEffect, useState } from "react";
import { post_data } from "../../services/PostMethod";
import { get_data } from "../../services/getMethod";

const AddWalkInCustomerModal = ({ onCancel, updatedData }) => {
  const [technicians, setTechnicians] = useState([]);
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    customer: "",
    technician: "",
    serviceType: "",
    model: "",
    deviceType: "",
    description: "",
    servicePrice: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // fetch services and technicians
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [techs, servs] = await Promise.all([
          get_data("/technicians"),
          get_data("/services"),
        ]);
        setTechnicians(techs || []);
        setServices(servs || []);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customer || !formData.model || !formData.deviceType || !formData.serviceType)
      return;

    setIsLoading(true);

    try {
        const payload = {
            ...formData,
            status: "Pending",
        };

        const response = await post_data("/create-walkin-request", payload);

        if (response) {
            updatedData((prev) => [
            {
                ...response,
                customer: response.customer,
                technician: response.technician?.full_name,
                technicianId: response.technician?._id,
                serviceType: response.serviceType?.service_name,
            },
            ...prev,
            ]);

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
        <h2 className="text-xl font-semibold mb-4">New Walk-In Customer</h2>

        <div className="space-y-3">
          <input
            type="text"
            name="customer"
            placeholder="Customer Name"
            value={formData.customer}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded placeholder:text-black"
          />

          <input
            type="text"
            name="deviceType"
            placeholder="Device Type (e.g., Laptop, Phone)"
            value={formData.deviceType}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded placeholder:text-black"
          />

          <input
            type="text"
            name="model"
            placeholder="Device Model"
            value={formData.model}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded placeholder:text-black"
          />

          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Service Type</option>
            {services.map((service) => (
              <option key={service._id} value={service._id}>
                {service.service_name}
              </option>
            ))}
          </select>

          <select
            name="technician"
            value={formData.technician}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Assign Technician (optional)</option>
            {technicians.map((tech) => (
              <option key={tech._id} value={tech._id}>
                {tech.full_name}
              </option>
            ))}
          </select>

          <textarea
            name="description"
            placeholder="Service Description (optional)"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded placeholder:text-black"
          />

          <input
            type="number"
            name="servicePrice"
            placeholder="Service Price (optional)"
            value={formData.servicePrice}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded placeholder:text-black"
          />
        </div>

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
